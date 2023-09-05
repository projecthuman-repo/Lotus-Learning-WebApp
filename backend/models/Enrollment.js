const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    currentLesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
    },
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
  },
  { timestamps: true } //createdAt + updatedAt
);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
