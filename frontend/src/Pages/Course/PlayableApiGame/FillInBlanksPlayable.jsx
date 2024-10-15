import React, { useEffect, useState } from "react";
import './styles.css';
import { FaCheckCircle } from "react-icons/fa";
import updateGrades from "../../../BackendProxy/courseProxy/updateGrades";

const FillInBlanksPlayable = ({ gameData, onNextLesson, isLastLesson, enrollment, selectedLesson }) => {
  const lessonId = selectedLesson._id;
  const lessonTitle = selectedLesson.title;
  const [completed, setCompleted] = useState(false);
  const [failed, setFailed] = useState(false); // State to track if user fails
  const [answersObj, setAnswersObj] = useState(() => {
    const data = gameData.game.fill_in_the_blanks.map((element) => {
      return { ...element, current: "" };
    });
    return data;
  });

  const updateAnswerCurrent = (index, newValue) => {
    setAnswersObj((prevAnswers) => {
      return prevAnswers.map((answer, i) => {
        if (i === index) {
          return { ...answer, current: newValue };
        }
        return answer;
      });
    });
  };

  const checkValues = () => {
    let correctCount = 0;
    const updatedAnswers = answersObj.map((element) => {
      if (element.current.toUpperCase() === element.Answer.toUpperCase()) {
        correctCount++;
        return { ...element, correct: true };
      } else {
        return { ...element, correct: false };
      }
    });

    setAnswersObj(updatedAnswers);
    return correctCount;
  };

  const handleCompletionCheck = () => {
    const correctCount = checkValues();
    const percentage = (correctCount / answersObj.length) * 100;

    if (percentage >= 80) {
      // Mark as completed
      setCompleted(true);
      setFailed(false); // Reset failure state
    } else {
      setFailed(true);
      setCompleted(false);
    }
  };

  // Function to save the grade to the backend using lessonId and lessonTitle
  const saveGradeToBackend = async (lessonId, lessonTitle, percentage) => {
    try {
      await updateGrades(enrollment._id, lessonId, lessonTitle, percentage);
      console.log("Grade saved successfully!");
    } catch (error) {
      console.error("Error saving grade:", error);
    }
  };

  // Handle saving the grade and then moving to the next lesson
  const handleNextLesson = async () => {
    if (completed) {
      const correctCount = checkValues();
      const percentage = (correctCount / answersObj.length) * 100;

      // Save grade when clicking the "Next" button
      await saveGradeToBackend(lessonId, lessonTitle, percentage);
      onNextLesson(); // Call the parent's onNextLesson prop after saving the grade
    }
  };

  useEffect(() => {
    console.log(answersObj);
  }, [answersObj]);

  const separateQuestionParts = (questions) => {
    return questions.map((item) => {
      const parts = item.Question.split(/__+/);
      return {
        Answer: item.Answer,
        QuestionParts: [
          parts[0].trim(),
          "", // Replacing the `__` with an empty string for input placeholder
          parts[1]?.trim() || "",
        ],
      };
    });
  };

  return (
    <div className="w-full relative">
      {completed && (
        <div className="absolute h-full w-full bg-[#0005] z-30 rounded-lg flex flex-col items-center justify-center amin-compleated-crossword">
          <FaCheckCircle className="text-3xl text-white" />
          <p className="mt-1 font-bold text-white">COMPLETED!</p>
          <button
            onClick={handleNextLesson} // Save grade and then move to the next lesson
            className="linearGradient_ver1 px-3 rounded-full font-semibold text-white hover:scale-[1.01] transition-all flex items-center justify-center mt-4"
          >
            {isLastLesson ? "Complete Course" : "Next"}
          </button>
        </div>
      )}

      {!completed && failed && (
        <div className="text-red-500 font-semibold mb-2">
          <p>Not enough correct answers. You need at least 80% correct to pass. Please try again!</p>
        </div>
      )}

      <div className="bg-white p-3 rounded-lg">
        {separateQuestionParts(gameData.game.fill_in_the_blanks).map((item, ind) => (
          <div className="flex my-2 p-2 items-center justify-start" key={item.Answer + "" + ind}>
            <p className="mr-2 font-semibold">{ind + 1}.</p>
            {item.QuestionParts.map((part, i) => (
              <div key={part + "_" + i} className="">
                {part === "" ? (
                  <input
                    onChange={(e) => updateAnswerCurrent(ind, e.target.value)}
                    value={answersObj[ind].current}
                    placeholder=". . ."
                    className={`${answersObj[ind].correct ? 'bg-green-100' : 'bg-zinc-50'}
                        font-semibold mx-2 focus:scale-[1.03] cursor-pointer focus:outline-none border-b-2 px-2 py-1 rounded-lg text-center`}
                  />
                ) : (
                  <p className="text-zinc-700">{part}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-2 pl-5">
        <button
          onClick={handleCompletionCheck}
          className='linearGradient_ver1 px-3 py-1 rounded-full font-semibold text-white hover:scale-[1.03] transition-all'
        >
          Check Answers
        </button>
      </div>
    </div>
  );
};

export default FillInBlanksPlayable;
