import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const WordDefinitionPlayable = ({ gameData }) => {
  console.log( gameData);
  
  const [finished, setFinished] = useState(false)
  const [compleated, setCompleated] = useState(false)
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
    setCompleated(checkCompleated())

};
const checkCompleated = () => {
  return answersObj.every((element) => {
    return element.current.toUpperCase() === element.Word.toUpperCase();
  });
};
useEffect(() => {
  
  setFinished(checkCompletition());
  console.log(answersObj);
  

}, [answersObj]);

const checkCompletition = () => {

  return answersObj.every((item) => item.current.length > 0);

};

  const traverseGameObj = () => {
    return answersObj.map((wordDefinition, index) => (
      <GameObj updateAnswerCurrent={updateAnswerCurrent} key={index} indx={index} wordDefinition={wordDefinition} />
    ));
  };

  return (
    <div className='h-[500px] w-full bg-zinc-50 flex items-center justify-center relative'>
            {
         compleated&&
          <div className="absolute h-full w-full bg-[#0005] z-30 rounded-lg flex flex-col items-center justify-center amin-compleated-crossword">
            <FaCheckCircle className="text-3xl text-white" />
            <p className="mt-1 font-bold text-white">COMPLETED!</p>
          </div>
        }
      <div className='bg-white p-3 rounded-lg'>
        {traverseGameObj()}
        {
        <div className='flex items-center justify-center '>
          {finished && <button onClick={() => checkValues()} className='linearGradient_ver1 px-3 py-1 rounded-full font-semibold text-white hover:scale-[1.03] transition-all'>Check</button>}
        </div>
      }
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
          <input onChange={(e) => updateAnswerCurrent(indx, e.target.value)} className={`${wordDefinition.correct? "border-b-green-100 border-b-2 bg-green-50" : "border-b-2 bg-zinc-50 "} my-2 text-center  rounded-lg focus:outline-none py-1 transition-all focus:bg-zinc-100`} placeholder='. . .'/>
          {/* {wordDefinition.Word} */}
          {/* <p className='bg-zinc-500 text-white rounded-full px-3  mx-2 font-semibold'></p> */}
        </div>
      </div>
    </div>
  );
};

export default WordDefinitionPlayable;
