import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";

const MultipleChoicePlayable = ({ gameData }) => {
  const [questionOn, setQuestionOn] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    if (questionOn >= gameData.game.mcqs.length - 1) {
      return;
    }
    setQuestionOn(questionOn + 1);
    return;
  };
  const handlePrev = () => {
    if (questionOn === 0) {
      return;
    }
    setQuestionOn(questionOn - 1);
    return;
  };
  // if(questionOn <= gameData.game.mcqs.length-1 ){
  //     checkResults()

  //   }
  useEffect(() => {
    console.log(answers);
    console.log(gameData.game.mcqs.length - 1);
    if (questionOn === gameData.game.mcqs.length) {
        if(answers.length  === gameData.game.mcqs.length ){
            setFinished(true);
        }
        else {
            const findMissingId = (list) => {
                const ids = list.map(item => item.question);
                ids.sort((a, b) => a - b);
                for (let i = 1; i <= ids[ids.length - 1]; i++) {
                  if (!ids.includes(i)) {
                    return i;
                  }
                }
                return ids[ids.length - 1] + 1;
            };
            setQuestionOn(findMissingId(answers))

        }
            
    }
  }, [questionOn]);


  const addNewAnswer = (newValue) => {
    let updatedList;

    // Si el índice es válido, actualizamos el valor
    if (questionOn >= 0 && questionOn < answers.length) {
      updatedList = answers.map((item, i) =>
        i === questionOn ? newValue : item
      );
    } else {
      // Si el índice no es válido, agregamos el nuevo valor al final
      updatedList = [...answers, newValue];
    }
    setAnswers(updatedList);
  };

  const checkIfAnswered = (index) => {

    const valueExists = (val, list) =>{
        return list.some(item => item.question === val)
    }

    if(valueExists(index,answers )){
        return true;
    }
    return false;
  }

  const checkResults = () => {
    // console.log(gameData.game.mcqs);
    console.log(answers);
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
              COMPLEATED!
            </p>
            <p>4/6</p>
            <div className="flex mt-4 space-x-3">
              <button className="p-2 flex items-center justify-center bg-zinc-300 rounded-full hover:bg-zinc-200 transition-all">
                <MdOutlineRestartAlt />
              </button>
              <button className="linearGradient_ver1 px-3 rounded-full font-semibold text-white hover:scale-[1.01] transition-all flex items-center justify-center ">
                <span className="mr-2">Continue</span>
                <FaChevronRight />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex mt-2 items-center justify-center space-x-4">
                {gameData.game.mcqs.map((item, i) => {
                    return (
                        <div  onClick={()=> setQuestionOn(i)} key={item.Answer+i} className={`h-4 w-4 ${checkIfAnswered(i)? 'bg-zinc-200' : 'bg-zinc-100 '}  rounded-full ${questionOn === i? "border-zinc-500" : "border-zinc-200"} border-2  cursor-pointer hover:scale-[1.1] transition-all`}>
                        </div>
                    )
                })}
            </div>
            {gameData.game.mcqs.map((item, i) => {
              return (
                <div
                  className={`h-full ${i === questionOn ? "block" : "hidden"}`}
                  key={i}
                >
                  <QuestionView
                    addNewAnswer={addNewAnswer}
                    setAnswers={setAnswers}
                    item={item}
                    setQuestionOn={setQuestionOn}
                    current={questionOn}
                    game={gameData.game.mcqs}
                  />
                </div>
              );
            })}
          </>
        )}
        {/* <QuestionView item={gameData.game.mcqs[questionOn]} setQuestionOn={setQuestionOn} current={questionOn} game={gameData.game.mcqs}/> */}
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

const QuestionView = ({ item, addNewAnswer, setQuestionOn, current, game }) => {
  const [count, setCount] = useState(5);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setFinished(true);
    }
  }, [count]);

  const saveAnswer = (val) => {
    addNewAnswer(val);
    setQuestionOn((e) => e + 1);
  };
  //   animate-shake

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="flex items-center justify-center h-full flex-col">
        <p className="font-semibold text-3xl text-zinc-700">{item.Question}</p>
        <p className="bg-black textwhite px-3 py-1 rounded-full text-white font-semibold text-xs">
          Answer
          <span className="mx-1">{item.Answer}</span>
        </p>

      </div>
      <div className="w-full grid grid-cols-2 gap-2 p-2">
        {answered && <div>s</div>}
        <div
          onClick={() => saveAnswer({
            answered: "A",
            question: current
          })}
          className="bg-blue-500 w-full h-[100px] border-b-4 border-blue-600 flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer"
        >
          {item.A}
        </div>
        <div
          onClick={() => saveAnswer({
            answered: "B",
            question: current
          })}
          className="bg-yellow-500 w-full border-b-4 border-yellow-600 h-[100px] flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer"
        >
          {item.B}
        </div>
        <div
          onClick={() => saveAnswer({
            answered: "C",
            question: current
          })}
          className="bg-red-500 w-full border-b-4 border-red-600 h-[100px] flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer"
        >
          {item.C}
        </div>
        <div
          onClick={() =>saveAnswer({
            answered: "D",
            question: current
          })}
          className="bg-green-500 w-full border-b-4 border-green-600 h-[100px] flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer"
        >
          {item.D}
        </div>
      </div>
    </div>
  );
};
export default MultipleChoicePlayable;
