/*
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, // Default type
    auto: true // Automatically generate an ObjectId if not provided
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  ],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
*/