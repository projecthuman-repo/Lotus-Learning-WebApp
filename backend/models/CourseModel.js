const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
});
courseSchema.pre('save', function (next) {
  if (this.lessons.length === 0) {
    this.lessons.push({
      title: 'Lesson Title',
      description: 'Default Description',
    });
  }
  next();
});

const Course = mongoose.model('courses', courseSchema);

module.exports = Course;
