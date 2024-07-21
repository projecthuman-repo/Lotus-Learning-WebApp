import React, { useEffect, useState } from "react";
import FetchGameApi from "./FetchGameApi";
import { MainLessonContext } from "../../CourseEditPage";
import { generateCrossword } from "../../../../../BackendProxy/ai_api_connection/ai_api_connection";
import BarLoader from "../../../../../components/loaders/BarLoader";
import "./styles.css";
const CrossWordEdit = ({gameData}) => {
  const { index, updateLessons, lessons, lesson } = MainLessonContext();

  const [loaded, setLoaded] = useState(false);
  // const [gameData, setGameData] = useState(null);
  const [answersHintsObj, setAnswersHintsObj] = useState(null);

  // const fetchData = async () => {
  //   try {
  //     const res = await generateCrossword(
  //       lesson.lessonContent.base_content.material_id
  //     );
  //     setLoaded(true);
  //     setGameData(res);
  //     console.log(res);
  //   } catch (error) {
  //     console.error("error at FetchGameApi", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  useEffect(() => {
    if (gameData) {
      setAnswersHintsObj(getHintExtraInfo(gameData));
    }
  }, [gameData]);

  function getAnswer(hint) {
    return gameData.basegame.word_definitions.find(
      (item) => item.Definition === hint
    );
  }

  const getHintExtraInfo = (gameInfo) => {
    const hints = {
      horizontal: [],
      vertical: [],
    };
    const hints_base = gameInfo.game.crossword.hints;

    for (let i = 0; i < hints_base.horizontal.length; i++) {
      const answer = getAnswer(hints_base.horizontal[i].hint);
      hints.horizontal.push({
        hint: answer.Definition,
        answer: answer.Word,
        number: hints_base.horizontal[i].number,
      });
    }
    for (let i = 0; i < hints_base.vertical.length; i++) {
      const answer = getAnswer(hints_base.vertical[i].hint);
      hints.vertical.push({
        hint: answer.Definition,
        answer: answer.Word,
        number: hints_base.vertical[i].number,
      });
    }
    return hints;
  };

  return (
    <div>
      {!true ? (
        <div className="h-[250px] bg-stone-50 flex items-center justify-center">
          <BarLoader />
        </div>
      ) : (
        <div>
          <div className="w-full text-center bg-zinc-50 text-zinc-300 mb-1 font-smibold">Teacher View</div>
        <div className="flex ">
          <div className="max-h-[60vh] flex items-center justify-center overflow-y-auto">
            <Crossword gameData={gameData} />
          </div>
          <div className="w-[600px] ml-2">
            <p className="font-semibold text_linearGradient_ver1">Vertical</p>
            <div className="bg-zinc-50  p-2 rounded-lg">

            {answersHintsObj &&
              answersHintsObj.vertical.map((item, i) => {
                return (
                  <div key={i + "" + item.number}>
                    <span className="mr-1 font-semibold text-xs">{item.number}.</span>
                    <span className="text-sm">{item.hint}</span>
                    <span className="mx-2 bg-black text-white text-xs  font-semibold px-2 rounded-full">{item.answer} </span>
                  </div>
                );
              })}
            </div>

            <p className="font-semibold text_linearGradient_ver1 ">Horizontal</p>

            <div className="bg-zinc-50 p-2 rounded-lg">
            {answersHintsObj &&
              answersHintsObj.horizontal.map((item, i) => {
                return (
                  <div key={i + "" + item.number}>
                    <span className="mr-1 font-semibold text-xs ">{item.number}.</span>
                    <span className="text-sm">{item.hint}</span>
                    <span className="mx-2 bg-black text-white text-xs  font-semibold px-2 rounded-full">{item.answer} </span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
        </div>
      )}
    </div>
  );
};
const Crossword = ({ gameData }) => {
  const gridCrossWord = gameData.game.crossword.grid;

  let lastId = 0;
  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36); // Convertir la marca de tiempo a base 36
    const id = (lastId++).toString(36); // Incrementar el contador y convertir a base 36
    return `${timestamp}-${id}`;
  };
  function getHintInfo(number) {
    const referenceObject = gameData.game.crossword.hints;
    const horizontalEntry = referenceObject.horizontal.find(
      (entry) => entry.number === number
    );
    if (horizontalEntry) {
      return { type: "horizontal", hint: horizontalEntry.hint };
    }
    const verticalEntry = referenceObject.vertical.find(
      (entry) => entry.number === number
    );
    if (verticalEntry) {
      return { type: "vertical", hint: verticalEntry.hint };
    }
    return { type: "unknown", hint: "Number not found in referenceObject" };
  }
  function getAnswer(hint) {
    return gameData.basegame.word_definitions.find(
      (item) => item.Definition === hint
    );
  }
  const generateGrid = (matrix) => {
    const newMatrix = [];
    const toLinkVertical = [];

    for (let i = 0; i < matrix.length; i++) {
      const row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (typeof matrix[i][j] === "number") {
          const hintObj = getHintInfo(matrix[i][j]);
          const answerObj = getAnswer(hintObj.hint);
          const finalObj = {
            hint_number: matrix[i][j],
            type: hintObj.type,
            answer: answerObj.Word[0],
            current: "",
            ref: generateUniqueId(),
          };
          row.push(finalObj);

          if (hintObj.type === "horizontal") {
            for (let k = 1; k < answerObj.Word.length; k++) {
              if (matrix[i][j + k] === " ") {
                row.push({
                  ref: generateUniqueId(),
                  answer: answerObj.Word[k],
                  current: "",
                });
              }
            }
            j += answerObj.Word.length - 1;
          } else if (hintObj.type === "vertical") {
            toLinkVertical.push({
              row: i,
              col: j,
              length: answerObj.Word.length,
              word: answerObj.Word,
            });
          }
        } else if (matrix[i][j] === " ") {
          row.push(" ");
        } else {
          row.push("");
        }
      }
      newMatrix.push(row);
    }

    // Handle vertical linking
    toLinkVertical.forEach((link) => {
      for (let k = 1; k < link.word.length; k++) {
        const newRow = link.row + k;
        const newCol = link.col;

        // Check bounds
        if (newRow < matrix.length && newCol < matrix[0].length) {
          if (matrix[newRow][newCol] === " ") {
            newMatrix[newRow][newCol] = {
              ref: generateUniqueId(),
              answer: link.word[k],
              current: "",
            };
          }
        }
      }
    });
    const columnsToKeep = newMatrix[0]
      .map((_, colIndex) => colIndex)
      .filter((colIndex) =>
        newMatrix.some((row) => row[colIndex] !== "" && row[colIndex] !== " ")
      );
    function areAllAnswersCurrentEqual(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          const element = arr[i][j];
          if (typeof element === "object" && element !== null) {
            if (
              element.hasOwnProperty("answer") &&
              element.hasOwnProperty("current")
            ) {
              if (
                element.answer.toUpperCase() !== element.current.toUpperCase()
              ) {
                return false;
              }
            }
          }
        }
      }
      return true;
    }

    const updateItemById = (ref, newValue) => {
      const updatedMatrix = filteredMatrix.map((row) =>
        row.map((cell) =>
          cell.ref === ref ? { ...cell, current: newValue } : cell
        )
      );
      setFilteredMatrix(updatedMatrix);
    };

    const checkAnswers = () => {
      console.log(areAllAnswersCurrentEqual(filteredMatrix));
    };

    const [filteredMatrix, setFilteredMatrix] = useState(
      newMatrix.map((row) => columnsToKeep.map((colIndex) => row[colIndex]))
    );

    return (
      <div className="">
        {/* <button onClick={() => checkAnswers()}>Check</button> */}
        <table className="table-auto border-collapse  border-gray-400 bg-zinc-300 rounded-lg crossword-table">
          <tbody>
            {filteredMatrix.map((row, rowIndex) => {
              if (row.every((cell) => cell === "")) {
                return null;
              }
              return (
                <tr key={rowIndex} className=" border-gray-400">
                  {row.map((cell, cellIndex) => {
                    if (cell !== "") {
                      return (
                        <td
                          key={cellIndex}
                          className=" cell-undefined border-gray-400  cell  cursor-pointer "
                        >
                          <div className="relative w-full h-full p-[0.13rem]">
                            <input
                              type="text"
                              maxLength="1"
                              className="font-bold border-b-2 border-zinc-400 text-xl h-full w-full focus:outline-none rounded-lg bg-zinc-100  text-center focus:scale-[1.08] transition-all"
                              value={cell.current ? cell.current : ""}
                              onChange={(e) => {
                                updateItemById(
                                  cell.ref,
                                  e.target.value.toUpperCase()
                                );
                                if (e.target.value.length === 1) {
                                  const nextInput = e.target.nextElementSibling;
                                  if (
                                    nextInput &&
                                    nextInput.tagName === "INPUT"
                                  ) {
                                    nextInput.focus();
                                  }
                                }
                              }}
                            />
                            <p className="absolute text-xs font-semibold text-stone-500 top-1 left-1">
                              {cell.hint_number}
                            </p>
                          </div>
                        </td>
                      );
                    } else {
                      return (
                        <td key={cellIndex} className="  cell p-[0.13rem]">
                          <div className="h-full bg-zinc-300  border-2 w-full rounded-lg"></div>
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="">
      <div>
        <div className="max-h-[60vh] overflow-y-auto ">
          {generateGrid(gridCrossWord)}
        </div>
      </div>
    </div>
  );
};

export default CrossWordEdit;
