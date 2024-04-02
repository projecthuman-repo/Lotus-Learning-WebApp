const express = require('express');
const Course = require("../../models/CourseModel.js");
const {createNewCourse} = require('../../controllers/course/create-new-course.js');
const { updateCourseData } = require('../../controllers/course/update-course-content.js');
const router = express.Router();
const zlib = require('zlib');
const decompressData = require('../../helpers/decompressData.js');


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

router.post('/create-new-course', async(req, res, next) => {
  try{
    const newCourseObj = req.body
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

router.post('/update-course', async(req, res, next) => {
  try { 
    const course = req.body
    // DeCompress Data
     const courseData = await decompressData(course.data)
    const updatedCourseResponse = await updateCourseData(courseData)
  } catch (error) {
    return next(error.message);
  }
})

module.exports = router;

