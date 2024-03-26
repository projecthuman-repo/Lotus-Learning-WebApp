const Course = require('../../models/Course');
const User = require('../../models/User');

/**
 * The function `user` retrieves a user by their ID and returns their information.
 * @param userId - The `userId` parameter is the unique identifier of the user that we want to retrieve
 * from the database.
 * @returns a promise that resolves to an object containing the user's data. The user's data is
 * obtained by finding a user with the specified userId using the `User.findById` method. The returned
 * object is a spread of the `user._doc` object, which contains the user's data, with the `_id`
 * property set to `user.id`.
 */
const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return { ...user._doc, _id: user.id };
  } catch (err) {
    throw err;
  }
};

/**
 * The function `singleCourse` retrieves a course by its ID and transforms it before returning it.
 * @param courseId - The `courseId` parameter is the unique identifier of the course that you want to
 * retrieve. It is used to query the database and find the course with the matching ID.
 * @returns The function `singleCourse` is returning a promise that resolves to the transformed course
 * object.
 */
const singleCourse = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
    return transformCourse(course);
  } catch (err) {
    throw err;
  }
};

/**
 * The function `transformCourse` takes a course object and returns a new object with the same
 * properties as the course object, but with the `creator` property transformed using the `user`
 * function.
 * @param course - The `course` parameter is an object that represents a course. It likely has
 * properties such as `title`, `description`, `creator`, etc.
 * @returns The function `transformCourse` returns an object that includes all the properties of the
 * `course._doc` object, with an additional property `creator` that is bound to the `user` function
 * with the `course.creator` as an argument.
 */
const transformCourse = (course) => {
  return { ...course._doc, creator: user.bind(this, course.creator) };
};

/**
 * The function `transformEnrollment` transforms an enrollment object by binding the learner and course
 * properties to their respective functions, and converting the createdAt and updatedAt properties to
 * ISO string format.
 * @param enrollment - The `enrollment` parameter is an object that represents an enrollment record. It
 * likely has properties such as `learner`, `course`, `createdAt`, and `updatedAt`.
 * @returns The function `transformEnrollment` returns an object with the following properties:
 */
const transformEnrollment = (enrollment) => {
  return {
    ...enrollment._doc,
    learner: user.bind(this, enrollment._doc.learner),
    course: singleCourse.bind(this, enrollment._doc.course),
    createdAt: new Date(enrollment._doc.createdAt).toISOString(),
    updatedAt: new Date(enrollment._doc.updatedAt).toISOString(),
  };
};

exports.transformCourse = transformCourse;
exports.transformEnrollment = transformEnrollment;
