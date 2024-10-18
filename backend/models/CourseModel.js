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
  courseStarted:{
    type:Boolean,
    default:false,
  },
  compleated: {
    type: Boolean,
    default: false,
    required: true
  },
  accepted: {
    type: Boolean,
    default: false,
    required: true
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
    username: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    institutionName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    accountType: { type: String, enum: ['student', 'instructor', 'admin'], required: true},
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
      title: {
        type: String,
        required: true,
        default: 'Lesson Title' 
      },
      description: {
        type: String,
        required: true,
      },
      mainContent: {
        type: String,
      },
      filename: {
        type: String,
      },
      lessonContent: {
        type: mongoose.Schema.Types.Mixed
      },
      type: {
        type: String,
      },
      attachedFile: mongoose.Schema.Types.Mixed,
      isCompleted: { 
        type: Boolean,
        default: false,
      },
      extraActivities: [
        {
          type: {
            type: String,
            enum: ["quiz", "openQuestion"],
            required: true,
          },
          openQuestion: {
            type: String,
          },
          quiz: [
            {
              text: String,
              correct: Boolean,
            },
          ],
        },
      ],
    }
  ],
},{ timestamps: true });

courseSchema.pre('save', function (next) {
  if (this.lessons.length === 0) {
    this.lessons.push({
      title: 'Lesson Title',
      description: 'Default Description',
    });
  }
  next();
});

courseSchema.methods.calculateProgress = function () {
  const totalLessons = this.lessons.length;
  const completedLessons = this.lessons.filter(lesson => lesson.isCompleted).length;
  
  if (totalLessons === 0) return 0;
  return (completedLessons / totalLessons) * 100; // Returns progress as a percentage
};

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
