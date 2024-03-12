const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainContent: {
    type: String,

  },
  extraActivities: [
    {
      type: {
        type: String,
        enum: ['quiz', 'openQuestion'],
        required: true,
      },
      openQuestion: {
        type: String, 
      },
      quiz: [{
        text: String,
        correct: Boolean,
      }], 
    },
  ],
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
