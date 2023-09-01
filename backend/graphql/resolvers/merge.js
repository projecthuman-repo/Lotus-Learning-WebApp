const Course = require('../../models/Course');
const User = require('../../models/User');

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return { ...user._doc, _id: user.id };
  } catch (err) {
    throw err;
  }
};

const singleCourse = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
    return transformCourse(course);
  } catch (err) {
    throw err;
  }
};

const transformCourse = (course) => {
  return { ...course._doc, creator: user.bind(this, course.creator) };
};

const transformEnrollment = (enrollment) => {
  return {
    ...enrollment._doc,
    learner: user.bind(this, enrollment._doc.learner),
    course: singleCourse.bind(this, enrollment._doc.course),
    createdAt: new Date(enrollment._doc.createdAt).toISOString(),
    updatedAt: new Date(enrollment._doc.updatedAt).toISOString(),
  };
};

// exports.user = user;
// exports.singleCourse = singleCourse;

exports.transformCourse = transformCourse;
exports.transformEnrollment = transformEnrollment;
// exports.singleCourse = singleCourse;
