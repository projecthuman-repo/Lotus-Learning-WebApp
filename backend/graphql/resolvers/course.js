const Course = require('../../models/Course');
const { transformCourse } = require('./merge');

module.exports = {
  /* The `getCourses` function is an asynchronous function that retrieves all courses from the database
  using the `Course.find()` method. It then maps over the array of courses and transforms each course
  using the `transformCourse` function. The transformed courses are then returned as an array. If an
  error occurs during the retrieval process, the error is thrown. */
  getCourses: async () => {
    try {
      const courses = await Course.find();
      return courses.map((course) => {
        return transformCourse(course);
      });
    } catch (err) {
      throw err;
    }
  },

  /*The `createCourse` function is an asynchronous function that creates a new course in the database.
  The code `if (!req.isAuth) { throw new Error('Unauthenticated'); }` is checking if the user
  making the request is authenticated. If the user is not authenticated, it throws an error with
  the message 'Unauthenticated'. This is a security measure to ensure that only authenticated
  users can create a new course in the database. */
  createCourse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    const course = new Course({
      title: args.courseInput.title,
      description: args.courseInput.description,
      age: args.courseInput.age,
      subject: args.courseInput.subject,
      creator: '64f2779274cd65e285ebb3e9',
    });
    let createdCourse;
    try {
      const result = await course.save();
      createdCourse = transformCourse(result);

      return createdCourse;
    } catch (err) {
      throw err;
    }
  },
};
