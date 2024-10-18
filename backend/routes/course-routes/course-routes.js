const express = require('express');
const Course = require('../../models/CourseModel.js')
const {createNewCourse} = require('../../controllers/course/create-new-course.js');
const { updateCourseData } = require('../../controllers/course/update-course-content.js');
const router = express.Router();
const zlib = require('zlib');
const decompressData = require('../../helpers/decompressData.js');
const Enrollment = require('../../models/Enrollment.js');
const Lesson = require('../../models/Lesson.js')
const { log, debug } = require('console');
const mongoose = require('mongoose');
const logger = require('../../logger');
const User = require('../../models/User.js');
const XLSX = require('xlsx');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const Student = require('../../models/User.js');

// On this file you can find all the routes for: 

  // GET ALL COURSES
  // GET ONE COURSE DATA BY ID
  // CREATE NEW COURSE
  // UPDATE EXISTING COURSE
  // GET COURSES BY PROP
  // DELETE COURSE BY ID

// GET ALL COURSES
router.get('/get-courses', async (req, res, next) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error("error getting courses ", error);
    res.status(500).json({ error: "internal server error" });
  }
});

// SEARCH COURSES

router.get('/search-courses', async (req, res, next) => {
  const { title } = req.query;
  try {
    const courses = await Course.find({ title: new RegExp(title, 'i') }); 
    return res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error("error in searching courses", error);
    res.status(500).json({ error: "internal server error" });
  }
});


// GET ONE COURSE DATA BY ID
router.get('/get-course-data', async(req, res, next) => {
  const courseId = req.query.id;
  try {
    // Find the course by its ID in the database using Mongoose
    const course = await Course.findById(courseId);
    
    if (!course) {
      // If the course is not found, return an error response
      return res.status(404).json({
        success: false,
      });
    }

    // Calculate progress for the course
   // const progress = course.calculateProgress();

   
    return res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    // If an error occurs during the search, send an error response
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CREATE NEW COURSE
router.post('/create-new-course', async(req, res, next) => {
  try{
    let newCourseObj = req.body
    if(newCourseObj.creator.accountType === 'instructor'){
      newCourseObj = {...newCourseObj, accepted: true}
    }
    else{
      newCourseObj = {...newCourseObj, accepted: false}

    }
    const newCourse = await createNewCourse(newCourseObj);

    console.log(newCourseObj)

    if(newCourse.res === 201){
      return res.status(200).json({
        success: true,
        data: newCourse
    });
    }else if(newCourse.res === 400){
      return res.status(400).json({
        success: false,
        data: newCourse
    });
    }


  }catch (error) {
    return next(error.message);
  }
})

// UPDATE EXISTING COURSE
router.post('/update-course', async (req, res, next) => {
  try { 
    const course = req.body;

    // Decompress the data
    const courseData = await decompressData(course.data);

    // Update the course data
    const updatedCourseResponse = await updateCourseData(courseData);

    // If successful, send success response
    res.status(200).json({
      success: true,
      data: updatedCourseResponse
    });
  } catch (error) {
    // Check if the error is a Mongoose VersionError
    if (error instanceof mongoose.Error.VersionError) {
      // Handle the version conflict gracefully, but still return success
      res.status(200).json({
        success: true,
        message: 'Course updated successfully, but there was a version conflict. Refetch the latest data.',
        data: null // You could return data if necessary
      });
    } else {
      // Handle other errors (e.g., validation, etc.)
      return res.status(400).json({
        success: false,
        message: 'Error updating course',
        error: error.message
      });
    }
  }
});

// GET COURSES BY PROP
router.post('/get-courses-by-prop', async(req, res, next) => {
  try {
    const { prop, value, code } = req.body;
    let courses = [];
    
    if(code && prop && value) {
      courses = await Course.find({
        $and: [{ "creator.code": code }, { [prop]: value }],
      });
    } else if(prop && value){
      courses = await Course.find({ [prop]: value });
    }
    else if(code)
    {
      courses = await Course.find({ "creator.code": code });
    }

    // Calculate progress for each course
    /*
    const coursesWithProgress = courses.map(course => ({
      ...course.toObject(),
      progress: course.calculateProgress() // Add progress
    }));*/

    return res.status(200).json({
      res: courses,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
});

//Grabbing enrollment data with specific user and course ids so we can individually track progress
router.get('/get-enrollment-by-userId-and-courseId', async (req, res) => {
  const { userId, courseId } = req.query;

  // Validate input parameters
  if (!userId || !courseId) {
    return res.status(400).json({
      success: false,
      message: 'Missing userId or courseId',
    });
  }

  try {
    // Find the enrollment document for the given user and course
    const enrollment = await Enrollment.findOne({ learner: userId, course: courseId }).populate("currentLesson");

 
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Return the enrollment and course as separate objects
    res.status(200).json({
      success: true,
      enrollment,
      course, 
    });
  } catch (error) {
    console.error('Error fetching enrollment data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// GET ALL ENROLLMENTS FOR A SPECIFIC USER
router.get('/get-user-enrollments', async (req, res, next) => {
  try {
    const { userId } = req.query;

    // Validate if userId is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required',
      });
    }

    const enrollments = await Enrollment.find({ learner: userId }).populate('course');
    logger.debug(enrollments, "ALL ENROLLS");

    // Check if enrollments were found
    if (enrollments.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No enrollments found for the specified user',
      });
    }

    // Update progress for all enrollments
    await Promise.all(
      enrollments.map(async (enrollment) => {
        await enrollment.updateProgress(); // This already saves the progress
      })
    );

    // Return the list of enrollments with updated progress
    return res.status(200).json({
      success: true,
      data: enrollments, 
    });

  } catch (error) {
    console.error("Error fetching enrollments for user:", error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

//This is necessary to remove from completed lessons list for all enrollments if teacher modifies course
router.post('/remove-lesson-from-enrollments', async (req, res) => {
  const { courseId, lessonId } = req.body;

  try {
    // Perform bulk update
    const result = await Enrollment.updateMany(
      { course: courseId }, // Match enrollments for the course
      { 
        $pull: { 
          completedLessons: lessonId, // Remove the lesson from completedLessons
          lessonGrades: { lessonId: lessonId } // Remove the lesson grade corresponding to the lessonId
        } 
      }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ success: false, message: 'No enrollments found or no lessons were updated.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Lesson and associated grades removed from all relevant enrollments.',
    });
  } catch (error) {
    console.error('Error removing lesson and grades from enrollments:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


//get enrolled courses
router.get('/get-enrolled-courses', async (req, res, next) => {
  try {
    const userId = req.query.userId;  
    logger.debug(userId);
    // Find all enrollments for the user
    const enrollments = await Enrollment.find({ learner: userId }); 
    if (enrollments.length === 0) {
      return res.status(200).json({
        res: [],
        success: true,
      });
    }

    // Get all course IDs from the enrollments
    const courseIds = enrollments.map(enrollment => enrollment.course);

    // Fetch the entire course documents
    const courses = await Course.find({ _id: { $in: courseIds } });

    // Return the full course data
    return res.status(200).json({
      res: courses, // Directly return the array of course objects
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching enrolled courses',
    });
  }
});

router.post('/enroll-student-by-institution', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
logger.debug(user,"USER");
    // Check if the user is a student (or eligible for enrollment)
    if (user.accountType !== 'student' && user.accountType!='instructor') {
  //  if (user.accountType !== 'student') {
      return res.status(400).json({ success: false, message: 'Only students can be enrolled in courses.' });
    }

    //  Retrieve the institution code from the user's profile
    const institutionCode = user.institution.code; 
    logger.debug(institutionCode,"CODE");
    if (!institutionCode) {
      return res.status(400).json({ success: false, message: 'Institution code not found for this user.' });
    }

   //Find courses associated with the institution code
    const courses = await Course.find({ 'creator.code': institutionCode });
    if (!courses.length) {
      // Return success response but with information that no courses are available
      return res.status(200).json({
        success: true,
        message: 'No courses available yet for this institution.',
        enrollments: []
      });
    }
    logger.debug(courses,"Courses");
    // Enroll the user in each course, but only if they are not already enrolled
    const enrollments = [];
    for (const course of courses) {
      // Check if the user is already enrolled in this course
      const existingEnrollment = await Enrollment.findOne({ learner: user._id, course: course._id });
      
      if (!existingEnrollment) {
        // Create a new enrollment if the user is not enrolled yet
        const enrollment = new Enrollment({
          course: course._id,
          learner: user._id,
          currentLesson: null, 
          completedLessons: [],
        });
        await enrollment.save();

        user.enrolledCourses.push(enrollment._id);
        enrollments.push(enrollment);
      }
    }

    await user.save();

    // Check if any enrollments were made
    if (!enrollments.length) {
      return res.status(400).json({
        success: false,
        message: 'User is already enrolled in all available courses for this institution.',
      });
    }
logger.debug(enrollments);
    
    return res.status(200).json({
      success: true,
      message: `User enrolled in ${enrollments.length} new course(s) for the institution.`,
      enrollments,
    });

  } catch (error) {
    console.error('Error enrolling user in institution courses:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during enrollment.' });
  }
});

// Enroll a specific student in a specific course
router.post('/enroll-student', async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

   
    const student = await User.findById(studentId);
    if (!student || student.accountType !== 'student') {
      return res.status(404).json({ success: false, message: 'Student not found or invalid account type' });
    }

    //Check if the student is already enrolled in the course
    const alreadyEnrolled = await Enrollment.findOne({ learner: studentId, course: courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ success: false, message: 'Student is already enrolled in this course' });
    }

    // Create a new enrollment for the student in the course
    const enrollment = new Enrollment({
      course: course._id,
      learner: student._id,
      currentLesson: null, // Set the initial lesson if applicable
      completedLessons: [],
    });

   
    await enrollment.save();

    //Update the student's enrolledCourses array
    student.enrolledCourses.push(enrollment._id);
    await student.save();

   
    return res.status(200).json({
      success: true,
      message: `Student enrolled in course ${course.title} successfully`,
    });

  } catch (error) {
    console.error('Error enrolling student in course:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/update-enrollment/:enrollmentId', async (req, res) => {
  const { enrollmentId } = req.params;
  const updates = req.body; // Fields to update

  try {
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No updates provided.' });
    }

    // Update the fields using $set
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { $set: updates }, // Dynamically update the fields sent in the request
      { new: true } // Return the updated document
    );

    if (!updatedEnrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found.' });
    }

    return res.status(200).json({ success: true, enrollment: updatedEnrollment });
  } catch (error) {
    console.error('Error updating enrollment:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});



router.post('/complete-lesson', async (req, res) => {
  try {
    const { enrollmentId, courseId, lessonId } = req.body;

    // Fetch the course separately
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the enrollment by ID
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Ensure the lesson exists in the course's lessons array
    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found in the course" });
    }

    // Update the currentLesson in the enrollment
    enrollment.currentLesson = lessonId;

    // If the lesson is not already in the completedLessons array, add it
if (!enrollment.completedLessons.some(lesson => lesson.toString() === lessonId.toString())) {
  enrollment.completedLessons.push(lessonId); // Only push if it's not already there
}
//const progress = await enrollment.calculateProgress();


//enrollment.progress = progress;
await enrollment.save();
    logger.info(enrollment);

    return res.status(200).json({
      message: 'Lesson marked as completed successfully for this student',
      enrollment,
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/update-lesson-grade', async (req, res) => {
  const { enrollmentId, lessonId, lessonTitle, grade } = req.body;

  if (grade < 0 || grade > 100) {
    return res.status(400).json({ success: false, message: 'Grade must be between 0 and 100.' });
  }

  try {
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found.' });
    }

    
    await enrollment.addOrUpdateLessonGrade(lessonId, lessonTitle, grade);
    logger.debug(enrollment,"EnrollObject");

    return res.status(200).json({
      success: true,
      message: 'Grade updated successfully.',
      enrollment,
    });
  } catch (error) {
    console.error('Error updating grade:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/get-all-grades/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch all enrollments for the student and populate the course and lessons
    const enrollments = await Enrollment.find({ learner: studentId })
      .populate('course')
      .lean();

    logger.debug(enrollments, "Enrollments in grades route");

    // Iterate through each enrollment to update lesson titles
    for (const enrollment of enrollments) {
      if (enrollment.lessonGrades && enrollment.lessonGrades.length > 0) {
        for (let grade of enrollment.lessonGrades) {
          // Find the corresponding lesson in the course to get the latest title
          const lessonFromCourse = enrollment.course.lessons.find(
            (lesson) => lesson._id.toString() === grade.lessonId.toString()
          );

          if (lessonFromCourse && lessonFromCourse.title !== grade.lessonTitle) {
            // Update the lesson title in the enrollment if it has changed
            await Enrollment.updateOne(
              { _id: enrollment._id, 'lessonGrades.lessonId': grade.lessonId },
              { $set: { 'lessonGrades.$.lessonTitle': lessonFromCourse.title } }
            );
            grade.lessonTitle = lessonFromCourse.title; // Update in-memory as well
          }
        }
      }
    }

    // Prepare the grades data
    const gradesData = enrollments.map((enrollment) => {
      if (enrollment.lessonGrades && enrollment.lessonGrades.length > 0) {
        return enrollment.lessonGrades.map((grade) => ({
          course: enrollment.course.title,
          lessonId: grade.lessonId,
          lessonTitle: grade.lessonTitle,
          grade: grade.grade,
        }));
      } else {
        return [];
      }
    }).flat(); // Flatten the array of lesson grades

    return res.status(200).json({
      success: true,
      data: gradesData,
    });
  } catch (error) {
    console.error('Error fetching grades:', error);
    return res.status(500).json({ success: false, message: 'Error fetching grades' });
  }
});

router.post('/download-zip-students-grades', async (req, res) => {
  try {
    const { studentIds } = req.body; // Expecting an array of student IDs
    logger.debug(studentIds, 'Student IDs received');

    if (!studentIds || studentIds.length === 0) {
      return res.status(400).json({ success: false, message: 'No student IDs provided' });
    }

    // Fetch all students by the provided IDs
    const students = await Student.find({ _id: { $in: studentIds } });
    logger.debug(students, 'Students found');

    // Prepare a temporary directory to store individual files
    const tempDir = path.join(__dirname, 'temp-grades');
    if (!fs.existsSync(tempDir)) {
      try {
        fs.mkdirSync(tempDir);
      } catch (err) {
        console.error('Error creating temp directory:', err);
        return res.status(500).json({ success: false, message: 'Error creating temp directory' });
      }
    }

    // Prepare to archive the files
    const archive = archiver('zip', { zlib: { level: 9 } });
    const zipFileName = 'filtered_students_grades.zip';
    const zipFilePath = path.join(tempDir, zipFileName);
    const output = fs.createWriteStream(zipFilePath);

    // Error handling for the archive
    archive.on('error', (err) => {
      console.error('Archive Error:', err);
      return res.status(500).json({ success: false, message: 'Error creating zip file' });
    });

    archive.pipe(output);

    // Loop through each student and create individual Excel files
    for (const student of students) {
      try {
        const enrollments = await Enrollment.find({ learner: student._id }).populate('course').lean();
        let hasGrades = false;

        const gradesData = enrollments.map((enrollment) => {
          if (enrollment.lessonGrades && enrollment.lessonGrades.length > 0) {
            hasGrades = true;
            return enrollment.lessonGrades.map((grade) => ({
              'Course': enrollment.course.title,
              'Lesson Title': grade.lessonTitle,
              'Grade': grade.grade,
            }));
          } else {
            return [];
          }
        }).flat();

        if (hasGrades) {
          logger.debug('Creating Excel file for student:', student.username);
          const worksheet = XLSX.utils.json_to_sheet(gradesData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');

          const studentFileName = `${student.username}_grades.xlsx`;
          const studentFilePath = path.join(tempDir, studentFileName);
          XLSX.writeFile(workbook, studentFilePath);

          // Append the file to the archive
          archive.file(studentFilePath, { name: studentFileName });
        }
      } catch (err) {
        console.error(`Error processing student ${student.username}:`, err);
        return res.status(500).json({ success: false, message: `Error processing student ${student.username}` });
      }
    }

    // Finalize the archive (zip file)
    await archive.finalize();

    // When the zip file is ready, send it to the client
    output.on('close', () => {
      logger.debug('ZIP file created successfully');
      if (!fs.existsSync(zipFilePath)) {
        return res.status(500).json({ success: false, message: 'ZIP file not found' });
      }

      res.download(zipFilePath, zipFileName, (err) => {
        if (err) {
          console.error('Error sending zip file:', err);
        }

        // Clean up the temporary directory after the file has been sent
        fs.readdir(tempDir, (err, files) => {
          if (err) throw err;
          for (const file of files) {
            fs.unlink(path.join(tempDir, file), (err) => {
              if (err) throw err;
            });
          }
        });
      });
    });
  } catch (error) {
    console.error('Error downloading grades:', error);
    return res.status(500).json({ success: false, message: 'Error downloading grades' });
  }
});


// DELETE COURSE BY ID
router.post('/delete-course-by-id', async(req, res, next) => {
  try {
    const { courseId } = req.body;

   
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    await Enrollment.deleteMany({ course: courseId });


    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

   
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedCourse
    });

  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;





