const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");
const Enrollment = require('../../models/Enrollment.js');
const Course =  require('../../models/CourseModel.js');
const logger = require('../../logger.js')

router.post("/get-students", async (req, res, next) => {
  try {
    const code = req.body.code;
    const users = await User.find({
      $and: [{ "institution.code": code }, { accountType: "student" }],
    });
    if (users) {
      return res.status(200).json({
        success: true,
        data: users,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Error at /admin/get-students",
      });
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/get-teachers", async (req, res, next) => {
    try {
      const code = req.body.code;
      const users = await User.find({
        $and: [{ "institution.code": code }, { accountType: "instructor" }],
      });
      if (users) {
        return res.status(200).json({
          success: true,
          data: users,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "Error at /admin/get-teachers",
        });
      }
    } catch (error) {
      return next(error);
    }
  });


  router.post('/enroll-all-students', async (req, res) => {
    const { institutionCode, courseId } = req.body;
  
    try {
    
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }
  
      // Find all users (students) with the same institution code
      
      const students = await User.find({
        'institution.code': institutionCode,
        accountType: { $in: ['student', 'instructor'] }
      });
      

      /*
      const students = await User.find({
        'institution.code': institutionCode,
        accountType: 'student'  
      });
      */
  
      if (!students.length) {
        return res.status(200).json({
          success: true,
          message: 'No students found in this institution',
        });
      }
  
      
      const enrollments = students.map(async (student) => {
        
        const enrollment = new Enrollment({
          course: course._id, 
          learner: student._id, 
          currentLesson: null, 
          completedLessons: [], 
        });
  
        await enrollment.save();
  
        // Update the student's enrolledCourses array
        student.enrolledCourses.push(enrollment._id); 
        await student.save();
      });
  
      await Promise.all(enrollments); 
  
      return res.status(200).json({ success: true, message: 'All students enrolled successfully' });
  
    } catch (error) {
      console.error('Error enrolling students:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
module.exports = router;
