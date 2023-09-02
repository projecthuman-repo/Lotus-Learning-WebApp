const Course = require('../../models/Course');
const { transformCourse } = require('./merge');

module.exports = {
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

  createCourse: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated');
    // }
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
