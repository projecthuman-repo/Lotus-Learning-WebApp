const express = require('express');
const Course = require("../../models/CourseModel.js");
const {createNewCourse} = require('../../controllers/course/create-new-course.js');
const { updateCourseData } = require('../../controllers/course/update-course-content.js');
const router = express.Router();
const zlib = require('zlib');
const decompressData = require('../../helpers/decompressData.js');
const Enrollment = require('../../models/Enrollment.js');
const { log } = require('console');

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
    const courses = await Course.find({ title: new RegExp(title, 'i') }); // Case insensitive search
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
    // If the course is found, return it as a response
    return res.status(200).json({
      success: true,
      data: course
  });
  } catch (error) {
    // If an error occurs during the search, send an error response
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

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
router.post('/update-course', async(req, res, next) => {
  try { 
    const course = req.body
    // DeCompress Data
     const courseData = await decompressData(course.data)
    const updatedCourseResponse = await updateCourseData(courseData)
    res.status(200).json({
      success: true,
      data: updatedCourseResponse
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
  });
  }
})

// GET COURSES BY PROP
router.post('/get-courses-by-prop', async(req, res, next) => {
  try {
    const { prop, value, code } = req.body;
    let courses = []
    if(code){
      courses = await Course.find({
        $and: [{ "creator.code": code }, {[prop]: value }],
      });
    }else{
      courses = await Course.find({[prop]: value });
    }

    if(courses){
      return res.status(200).json({
        res: [...courses],
        success: true,
      });
    }else{
      return res.status(200).json({
        res: [],
        success: true,
      });
    }

  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
})

//get enrolled courses




router.post('/get-enrolled-courses', async (req, res, next) => {
  try {
    

    const  UserID  = req.body.userId;
    // Find all enrollments for the user
    const enrollments = await Enrollment.find({ UserID });
    const firstEnrollment = enrollments[0];
   
    const courseId = firstEnrollment.CourseID;

    // Get all course IDs from the enrollments
    const courseIds = enrollments.map(enrollment => enrollment.CourseID);

    const courses = await Course.find({ _id: { $in: courseIds } });
   

    const enrolledCourses = enrollments.map(enrollment => {
      const course = courses.find(course => course._id == enrollment.CourseID);
      
      return {
        enrollment,
        course: course ? { title: course.title, creatorName: course.creator.username } : null
      };
      

    })
    return res.status(200).json({
      res: enrolledCourses,
      success: true,
    });
    


  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
    });
  }
});


// DELETE COURSE BY ID
router.post('/delete-course-by-id', async(req, res, next) => {
  try {


  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
})


module.exports = router;

