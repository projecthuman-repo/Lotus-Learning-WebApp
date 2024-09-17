const express = require('express');
const Course = require("../../models/CourseModel.js");
const {createNewCourse} = require('../../controllers/course/create-new-course.js');
const { updateCourseData } = require('../../controllers/course/update-course-content.js');
const router = express.Router();
const zlib = require('zlib');
const decompressData = require('../../helpers/decompressData.js');
const Enrollment = require('../../models/Enrollment.js');
const { log } = require('console');
const mongoose = require('mongoose');

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
    const progress = course.calculateProgress();

    // If the course is found, return it as a response, including progress
    return res.status(200).json({
      success: true,
      data: {
        ...course.toObject(),
        progress // Add progress to the response
      }
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
    if(newCourseObj.creator.accountType === 'admin'){
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
    
    if(code) {
      courses = await Course.find({
        $and: [{ "creator.code": code }, { [prop]: value }],
      });
    } else {
      courses = await Course.find({ [prop]: value });
    }

    // Calculate progress for each course
    const coursesWithProgress = courses.map(course => ({
      ...course.toObject(),
      progress: course.calculateProgress() // Add progress
    }));

    return res.status(200).json({
      res: coursesWithProgress,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
});

//get enrolled courses




router.get('/get-enrolled-courses', async (req, res, next) => {
  try {
    const userId = req.query.userId;  

    // Find all enrollments for the user
    const enrollments = await Enrollment.find({ UserID: userId });
    if (enrollments.length === 0) {
      return res.status(200).json({
        res: [],
        success: true,
      });
    }

    // Get all course IDs from the enrollments
    const courseIds = enrollments.map(enrollment => enrollment.CourseID);

    // Fetch the corresponding courses
    const courses = await Course.find({ _id: { $in: courseIds } });

    // Map the enrollments to the corresponding course data
    const enrolledCourses = enrollments.map(enrollment => {
      const course = courses.find(course => course._id.toString() === enrollment.CourseID.toString());
      return {
        enrollment,
        course: course ? { title: course.title, creatorName: course.creator.username } : null
      };
    });

    return res.status(200).json({
      res: enrolledCourses,
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

// Mark lesson as completed
router.post('/complete-lesson', async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the lesson by ID and mark it as completed
    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    lesson.isCompleted = true; // Mark lesson as completed

    // Save the updated course
    await course.save();

    return res.status(200).json({
      message: 'Lesson marked as completed successfully',
      course,
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    res.status(500).json({ message: 'Internal server error' });
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

