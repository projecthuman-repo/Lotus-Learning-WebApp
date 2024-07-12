const express = require('express');
const Course = require("../../models/CourseModel.js");
const {createNewCourse} = require('../../controllers/course/create-new-course.js');
const { updateCourseData } = require('../../controllers/course/update-course-content.js');
const router = express.Router();
const zlib = require('zlib');
const decompressData = require('../../helpers/decompressData.js');

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
    console.error("Error al buscar cursos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// GET ONE COURSE DATA BY ID
router.get('/get-course-data', async(req, res, next) => {
  const courseId = req.query.id;
  console.log("TTTTTTTTTTTTTTTTTTTEST" + courseId);
  try {
    // Find the course by its ID in the database using Mongoose
    const course = await Course.findById(courseId).lean();


    if (!course) {
      console.log(course);
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
    // const courseData = await decompressData(course.data)
    const updatedCourseResponse = await updateCourseData(course.data)
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
    console.log("value:"+ value);
    let courses = []
    if(code){
      courses = await Course.find({
        "creator.code": code,
        [prop]: value
      });
    }else{
      courses = await Course.find({[prop]: value });
    }
console.log(courses);
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

router.get('/latest-course', async (req, res, next) => {
  try {
      const latestCourse = await Course.findOne().sort({ _id: -1 });
      if (!latestCourse) {
          return res.status(404).json({ success: false, message: 'No courses found' });
      }
      res.status(200).json({ success: true, course: latestCourse });
  } catch (error) {
      next(error);
  }
});


// DELETE COURSE BY ID
router.delete('/delete-course-by-id', async (req, res, next) => {
  try {
    const { id } = req.body; 
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
        console.log('Course not found'); // Add logging
        return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
});
/*
router.post('/delete-course-by-id', async(req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
})
*/


module.exports = router;

