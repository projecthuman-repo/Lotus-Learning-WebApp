import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import updateGrades from "../../../BackendProxy/courseProxy/updateGrades"; // Import the function to save grades

const WordDefinitionPlayable = ({ gameData, onNextLesson, isLastLesson, enrollment, selectedLesson }) => {
  const [finished, setFinished] = useState(false);
  const [compleated, setCompleated] = useState(false);
  const [message, setMessage] = useState(''); // State to display the message for correct answers
  const [percentageCorrect, setPercentageCorrect] = useState(0); // Store the percentage score
  const [answersObj, setAnswersObj] = useState(() => {
    const half = Math.ceil(gameData.game.word_definitions.length / 2);
    const data = gameData.game.word_definitions.slice(0, half).map((element) => {
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
    setAnswersObj(prevAnswers =>
      prevAnswers.map((element) => {
        if (element.current.toUpperCase() === element.Word.toUpperCase()) {
          return { ...element, correct: true };
        } else {
          return { ...element, correct: false };
        }
      })
    );
    const totalCorrect = calculateCorrectAnswers();
    const percentage = (totalCorrect / answersObj.length) * 100;
    setPercentageCorrect(percentage);

    if (percentage >= 80) {
      setCompleated(true);
      setMessage('Great job! You answered 80% or more correctly.');
    } else {
      setMessage('Not enough correct answers, needs to be 80% or more try again.');
    }
  };

  const calculateCorrectAnswers = () => {
    return answersObj.reduce((total, element) => {
      if (element.current.toUpperCase() === element.Word.toUpperCase()) {
        return total + 1;
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    setFinished(checkCompletition());
  }, [answersObj]);

  const checkCompletition = () => {
    return answersObj.every((item) => item.current.length > 0);
  };

  // Function to save the grade to the backend
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

  // Handle what happens when "Next" button is clicked
  const handleNextLesson = () => {
    if (compleated) {
      saveGradeToBackend(percentageCorrect); // Save the grade only if the user has completed with 80% or more correct
    }
    onNextLesson(); // Proceed to the next lesson
  };

  const traverseGameObj = () => {
    return answersObj.map((wordDefinition, index) => (
      <GameObj updateAnswerCurrent={updateAnswerCurrent} key={index} indx={index} wordDefinition={wordDefinition} />
    ));
  };

  return (
    <div className='h-[500px] w-full bg-zinc-50 flex items-center justify-center relative'>
      {compleated && (
        <div className="absolute h-full w-full bg-[#0005] z-30 rounded-lg flex flex-col items-center justify-center amin-compleated-crossword">
          <FaCheckCircle className="text-3xl text-white" />
          <p className="mt-1 font-bold text-white">COMPLETED!</p>
          <button onClick={handleNextLesson} className="linearGradient_ver1 px-3 rounded-full font-semibold text-white hover:scale-[1.01] transition-all flex items-center justify-center">
            <span className="mr-2">{isLastLesson ? "Complete Course" : "Next"}</span>
          </button>
        </div>
      )}
      <div className='bg-white p-3 rounded-lg'>
        {traverseGameObj()}
        <div className='flex items-center justify-center '>
          {finished && (
            <button onClick={checkValues} className='linearGradient_ver1 px-3 py-1 rounded-full font-semibold text-white hover:scale-[1.03] transition-all'>
              Check
            </button>
          )}
        </div>
        {message && <p className={`mt-2 font-semibold ${compleated ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      </div>
    </div>
  );
};

const GameObj = ({ wordDefinition, indx, updateAnswerCurrent }) => {
  return (
    <div>
      <p className='text-zinc-600 text-center'> {wordDefinition.Definition}</p>
      <div>
        <div className='flex  mt-1 flex-col'>
          <input
            onChange={(e) => updateAnswerCurrent(indx, e.target.value)}
            className={`${wordDefinition.correct ? 'border-b-green-100 border-b-2 bg-green-50' : 'border-b-2 bg-zinc-50'} my-2 text-center rounded-lg focus:outline-none py-1 transition-all focus:bg-zinc-100`}
            placeholder='. . .'
          />
        </div>
      </div>
    </div>
  );
};

export default WordDefinitionPlayable;
