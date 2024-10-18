import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";
import updateGrades from "../../../BackendProxy/courseProxy/updateGrades";

const MultipleChoicePlayable = ({ gameData, onNextLesson, isLastLesson,enrollment, selectedLesson  }) => {
  const [questionOn, setQuestionOn] = useState(0);
  const [answers, setAnswers] = useState([]); // Store answers
  const [finished, setFinished] = useState(false);
  const [completed, setCompleted] = useState(false); // Track if the user passed the quiz
  const [percentage, setPercentageCorrect] = useState(0);

  // Reset state when the gameData changes (new lesson starts)
  useEffect(() => {
    if (gameData && gameData.game && gameData.game.mcqs) {
      resetGame(); // Reset the game state when new data is loaded
    }
  }, [gameData]);

  // Function to reset the quiz state
  const resetGame = () => {
    setQuestionOn(0);
    setAnswers([]); // Reset answers
    setFinished(false);
    setCompleted(false); // Reset completed state for new game
  };

  const handleNext = () => {
    if (questionOn >= gameData.game.mcqs.length - 1) {
      setFinished(true);
      return;
    }
    setQuestionOn(questionOn + 1);
  };

  const handlePrev = () => {
    if (questionOn === 0) return;
    setQuestionOn(questionOn - 1);
  };

  const restart = () => {
    resetGame(); 
  };

  const saveGradeToBackend = async (percentageCorrect) => {
    const lessonId = selectedLesson._id;
    const lessonTitle = selectedLesson.title;

    try {
      // Save the grade to the backend
      await updateGrades(enrollment._id, lessonId, lessonTitle, percentageCorrect);
      console.log('Grade saved successfully!');
    } catch (error) {
      console.error('Error saving grade:', error);
    }
  };

   
   const handleNextLesson = () => {
    if (completed) {
      saveGradeToBackend(percentage); // Only save the grade if the game is completed
    }
    onNextLesson(); // Proceed to the next lesson
  };


  useEffect(() => {
    if (questionOn === gameData.game.mcqs.length) {
      if (answers.length === gameData.game.mcqs.length) {
        const correctAnswers = checkResults();
        const percentage = (correctAnswers / gameData.game.mcqs.length) * 100;

        if (percentage >= 80) {
          setCompleted(true); 
          setPercentageCorrect(percentage);
        }

        setFinished(true);
      } else {
        const findMissingId = (list) => {
          const ids = list.map((item) => item.question);
          ids.sort((a, b) => a - b);
          for (let i = 1; i <= ids[ids.length - 1]; i++) {
            if (!ids.includes(i)) {
              return i;
            }
          }
          return ids[ids.length - 1] + 1;
        };
        setQuestionOn(findMissingId(answers));
      }
    }
  }, [questionOn, answers, gameData.game.mcqs]);

  const addNewAnswer = (newValue) => {
    const updatedList = [...answers];
    const existingAnswerIndex = updatedList.findIndex(
      (item) => item.question === questionOn
    );
    if (existingAnswerIndex >= 0) {
      updatedList[existingAnswerIndex] = newValue; // Update the existing answer
    } else {
      updatedList.push(newValue); // Add a new answer
    }
    setAnswers(updatedList);
  };

  const checkIfAnswered = (index) => {
    return answers.some((item) => item.question === index);
  };

  const checkResults = () => {
    return answers.filter((answer) => answer.correct).length;
  };

  return (
    <div className="h-[500px] bg-zinc-50 flex items-center justify-center flex-col w-full">
      <div className="h-full w-full relative">
        {!finished && (
          <div
            onClick={() => handlePrev()}
            className="absolute top-[25%] left-10 hover:cursor-pointer hover:bg-zinc-200 p-2  rounded-full no-select"
          >
            <FaChevronLeft />
          </div>
        )}

        {finished ? (
          <div className=" h-full w-full  flex items-center justify-center flex-col">
            <p className="font-semibold text-2xl animate-expand-vertically">
              {completed ? "COMPLETED!" : "Not enough correct answers! Needs to be at least 80%"}
            </p>
            <p>
              {checkResults()}/{gameData.game.mcqs.length}
            </p>
            <div className="flex mt-4 space-x-3">
              {!completed && ( // Only show restart button if the user hasn't completed
                <button
                  onClick={restart}
                  className="p-2 flex items-center justify-center bg-zinc-300 rounded-full hover:bg-zinc-200 transition-all"
                >
                  <MdOutlineRestartAlt />
                </button>
              )}
              {completed && (
                <button
                  onClick={handleNextLesson}
                  className="linearGradient_ver1 px-3 rounded-full font-semibold text-white hover:scale-[1.01] transition-all flex items-center justify-center "
                >
                  <span className="mr-2">
                    {isLastLesson ? "Complete Course" : "Next"}
                  </span>
                  <FaChevronRight />
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex mt-2 items-center justify-center space-x-4">
              {gameData.game.mcqs.map((item, i) => (
                <div
                  onClick={() => setQuestionOn(i)}
                  key={i}
                  className={`h-4 w-4 ${
                    checkIfAnswered(i) ? "bg-zinc-200" : "bg-zinc-100"
                  }  rounded-full ${
                    questionOn === i ? "border-zinc-500" : "border-zinc-200"
                  } border-2  cursor-pointer hover:scale-[1.1] transition-all`}
                ></div>
              ))}
            </div>
            {gameData.game.mcqs.map((item, i) => (
              <div
                className={`h-full ${i === questionOn ? "block" : "hidden"}`}
                key={i}
              >
                <QuestionView
                  addNewAnswer={addNewAnswer}
                  item={item}
                  setQuestionOn={setQuestionOn}
                  current={questionOn}
                />
              </div>
            ))}
          </>
        )}
        {!finished && (
          <div
            onClick={() => handleNext()}
            className="no-select absolute top-[25%] right-10 hover:cursor-pointer hover:bg-zinc-200 p-2 rounded-full"
          >
            <FaChevronRight />
          </div>
        )}
      </div>
    </div>
  );
};

const QuestionView = ({ item, addNewAnswer, setQuestionOn, current }) => {
  const saveAnswer = (val) => {
    addNewAnswer(val);
    setQuestionOn((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="flex items-center justify-center h-full flex-col">
        <p className="font-semibold text-3xl text-zinc-700">{item.Question}</p>
      </div>
      <div className="w-full grid grid-cols-2 gap-2 p-2">
        <div
          onClick={() =>
            saveAnswer({
              answered: "A",
              question: current,
              correct: item.Answer === "A",
            })
          }
          className="bg-blue-500 w-full h-[100px] border-b-4 border-blue-600 flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer"
        >
          {item.A}
        </div>
        <div
          onClick={() =>
            saveAnswer({
              answered: "B",
              question: current,
              correct: item.Answer === "B",
            })
          }
          className="bg-yellow-500 w-full border-b-4 border-yellow-600 h-[100px] flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer"
        >
          {item.B}
        </div>
        <div
          onClick={() =>
            saveAnswer({
              answered: "C",
              question: current,
              correct: item.Answer === "C",
            })
          }
          className="bg-red-500 w-full border-b-4 border-red-600 h-[100px] flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer"
        >
          {item.C}
        </div>
        <div
          onClick={() =>
            saveAnswer({
              answered: "D",
              question: current,
              correct: item.Answer === "D",
            })
          }
          className="bg-green-500 w-full border-b-4 border-green-600 h-[100px] flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer"
        >
          {item.D}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoicePlayable;
