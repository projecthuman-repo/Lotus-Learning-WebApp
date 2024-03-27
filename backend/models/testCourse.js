const mongoose = require('mongoose');

const testCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  objectives: {
    one: {
      type: String,
    },
    two: {
      type: String,
    },
    three: {
      type: String,
    },
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LessonModel',
    },
  ],
});

const Course = mongoose.model('testCourses', testCourseSchema);

module.exports = testCourse;
