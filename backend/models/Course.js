const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
