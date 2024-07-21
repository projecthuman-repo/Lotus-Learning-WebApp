import React, { useEffect, useState } from "react";
import './styles.css'
import { FaCheckCircle } from "react-icons/fa";
const FillInBlanksPlayable = ({ gameData }) => {
  const [compleated, setCompleated] = useState(false)
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
    setAnswersObj(prevAnswers => 
        prevAnswers.map((element) => {
            if (element.current.toUpperCase() === element.Answer.toUpperCase()) {
                return { ...element, correct: true };
            } else {
                return { ...element, correct: false };
            }
        })
    );
};


  const checkCompleated = () => {
    answersObj.map((element) => {
        console.log(element.correct);
        if(!element.correct){
            return false
        }
    })
    return true
  }

  const handleCompletionCheck = () => {
    checkValues()
    if(checkCompleated()){
        console.log('1');
        setCompleated(true)
    }
  }
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
          "", // Reemplazar los `__` con una cadena vacía
          parts[1]?.trim() || "",
        ],
      };
    });
  };
  return (
    <div className="w-full">
      {/* <div className="p-2 flex space-x-2 bg-zinc-100 items-center">
        <p className="text-xs font-bold text-zinc-600">Answers</p>
        {gameData.game.fill_in_the_blanks.map((item, i) => {
          return (
            <p
              className="px-3 py-[0.09em] text-xs font-semibold bg-black text-white rounded-full "
              key={item.Answer + "" + i}
            >
              <span className="mr-1">{i + 1}.</span>
              {item.Answer}
            </p>
          );
        })}
      </div> */}
      <div className="h-[500px] w-full flex items-center justify-center flex-col bg-zinc-100 relative">
      {
         compleated&&
          <div className="absolute h-full w-full bg-[#0005] z-30 rounded-lg flex flex-col items-center justify-center amin-compleated-crossword">
            <FaCheckCircle className="text-3xl text-white" />
            <p className="mt-1 font-bold text-white">COMPLEATED!</p>
          </div>
        }
        <div className="bg-white p-3 rounded-lg">
          {separateQuestionParts(gameData.game.fill_in_the_blanks).map(
            (item, ind) => {
              return (
                <div
                  className="flex my-2 p-2 items-center justify-start"
                  key={item.Answer + "" + ind}
                >
                  <p className="mr-2 font-semibold">{ind + 1}.</p>
                  {item.QuestionParts.map((part, i) => {
                    console.log(item)
                    return (
                      <div key={part[i] + " " + i} className="">
                        {part === "" ? (
                          <input
                          onChange={(e) => updateAnswerCurrent(ind, e.target.value)}
                            value={item.current}
                            placeholder=". . ."
                            className={`${answersObj[ind].correct? 'bg-green-100' : 'bg-zinc-50  '}
                                font-semibold  mx-2 focus:scale-[1.03] cursor-pointer focus:outline-none border-b-2 px-2 py-1 rounded-lg text-center`}
                          />
                        ) : (
                          <p className=" text-zinc-700">{part}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            }
          )}
        </div>
          <div className="mt-2  ">
                <button onClick={handleCompletionCheck} className="linearGradient_ver1 px-3 rounded-full  text-white hover:scale-[1.03] transition-all">Check</button>
          </div>
      </div>
    </div>
  );
};

export default FillInBlanksPlayable;
