const mongoose = require("mongoose");

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
  filename: {
    type: String,
  },

  isCompleted:
  {type:Boolean,
    default:false
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
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
