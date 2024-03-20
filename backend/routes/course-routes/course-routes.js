const express = require('express');
const Course = require("../../models/CourseModel.js");
const {createNewCourse} = require('../../controllers/course/create-new-course.js')
const router = express.Router();



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

module.exports = router;

