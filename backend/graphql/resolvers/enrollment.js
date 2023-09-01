const Enrollment = require('../../models/Enrollment');
const Course = require('../../models/Course');
const { transformEnrollment, transformCourse } = require('./merge');

module.exports = {
  getEnrollments: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    try {
      const enrollments = await Enrollment.find();
      return enrollments.map((enrollment) => {
        return transformEnrollment(enrollment);
      });
    } catch (err) {
      throw err;
    }
  },

  createEnrollment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    const fetchedCourse = await Course.findOne({ _id: args.courseId });
    try {
      const enrollment = new Enrollment({
        learner: req.userId,
        course: fetchedCourse,
        progress: 0,
      });
      const result = await enrollment.save();
      return transformEnrollment(result);
    } catch (err) {
      throw err;
    }
  },
};
