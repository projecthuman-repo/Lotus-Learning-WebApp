const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  //   content: {
  //     Files
  //   },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
