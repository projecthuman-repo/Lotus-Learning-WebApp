const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
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
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  objectives: {
    objective1: {
      type: String,
    },
    objective2: {
      type: String,
    },
    objective3: {
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

const Course = mongoose.model('CourseModel', courseSchema);

module.exports = Course;
