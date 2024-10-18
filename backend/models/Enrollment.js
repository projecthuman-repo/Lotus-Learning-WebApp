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
    courseStarted:{
      type:Boolean,
      required: false,
    },
    progress: {
      type: Number,
      default: 0, 
      required: true,
    },

    lessonGrades: [
      {
        lessonId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Lesson',
          required: true,
        },
        lessonTitle: {
          type: String, 
          required: true,
        },
        grade: {
          type: Number,
          min: 0,
          max: 100,
        },
      }
    ],

    CourseID: {
      type: String,
      required: false, // Set to true if it must be provided
    },
    UserID: {
      type: String,
      required: false, // Set to true if it must be provided
    },
  },
  { timestamps: true } //createdAt + updatedAt
);

enrollmentSchema.methods.updateProgress = async function () {
  const course = await this.model('Course').findById(this.course); 
  if (!course) throw new Error('Course not found.');

  const totalLessons = course.lessons.length;
  const completedLessonsCount = this.completedLessons.length;

  if (totalLessons === 0) {
    this.progress = 0;
  } else {
    this.progress = (completedLessonsCount / totalLessons) * 100;
  }

  await this.save(); 
  return this;
};

enrollmentSchema.methods.addOrUpdateLessonGrade = async function (lessonId, lessonTitle, grade) {
  // Find if there's already a grade for the specific lessonId
  const existingLessonGrade = this.lessonGrades.find(
    (g) => g.lessonId.toString() === lessonId.toString()
  );

  if (existingLessonGrade) {
    // If grade exists for the lesson, update it
    existingLessonGrade.grade = grade;
  } else {
    // Otherwise, add a new grade entry for the lesson
    this.lessonGrades.push({ lessonId, lessonTitle, grade});
  }

  // Save the updated enrollment document
  await this.save();
  return this;
};


const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
