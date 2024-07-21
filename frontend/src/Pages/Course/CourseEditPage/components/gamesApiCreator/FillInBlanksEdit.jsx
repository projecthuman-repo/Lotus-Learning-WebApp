import React from "react";

const FillInBlanksEdit = ({ gameData }) => {
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

  console.log(gameData);
  return (
    <div>
      <div className="w-full text-center bg-zinc-50 text-zinc-300  font-smibold">
        Teacher View
      </div>
      <div className="px-2 flex space-x-2 bg-zinc-100 items-center">
          <p className="text-xs font-bold text-zinc-600">Answers</p>
            {gameData.game.fill_in_the_blanks.map((item, i) => {
              return (
                <p className="px-3 py-[0.09em] text-xs font-semibold bg-black text-white rounded-full " key={item.Answer+''+i}>
                  <span className="mr-1">
                  {i+1}.
                  </span>
                  {item.Answer}</p>
              )
            })}
      </div>
      <div className="h-[500px] flex items-center justify-center flex-col bg-zinc-100">
        <div className="bg-white p-3 rounded-lg">
          {separateQuestionParts(gameData.game.fill_in_the_blanks).map(
            (item, ind) => {
              return (
                <div
                  className="flex my-2 p-2 items-center justify-start"
                  key={item.Answer}
                >
                  <p className="mr-2 font-semibold">{ind + 1}.</p>
                  {item.QuestionParts.map((part, i) => {
                    return (
                      <div key={part[0] + "" + i} className="">
                        {part === "" ? (
                          <input
                            placeholder=". . ."
                            className="mx-2 focus:scale-[1.03] cursor-pointer focus:outline-none bg-zinc-50 border-b-2 px-2 py-1 rounded-lg text-center"
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

      </div>
    </div>
  );
};

export default FillInBlanksEdit;
