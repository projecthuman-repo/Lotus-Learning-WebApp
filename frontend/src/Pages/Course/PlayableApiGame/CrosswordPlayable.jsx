import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./styles.css";
import updateGrades from "../../../BackendProxy/courseProxy/updateGrades";

const CrosswordPlayable = ({ gameData, onNextLesson, isLastLesson, enrollment,selectedLesson }) => {
  const [answersHintsObj, setAnswersHintsObj] = useState(null);
  const [filteredMatrix, setFilteredMatrix] = useState(null);
  const [compleated, setCompleated] = useState(false);
  const [percentage, setPercentageCorrect] = useState(0);
  
  useEffect(() => {
    if (gameData) {
      setAnswersHintsObj(getHintExtraInfo(gameData));
    }
  }, [gameData]);

  const checkAnswers = () => {
    const copiedMatrix = [...filteredMatrix];
    const newMatrix = checkAndUpdate(copiedMatrix); // Update correctness of words
    setFilteredMatrix(newMatrix);
    const words = extractWords(newMatrix);
    console.log("Words extracted:", words); // Log all words to see what's extracted

    const correctWordCount = countCorrectWords(newMatrix);
   
    console.log(correctWordCount);
    const totalWordCount = countTotalWords(newMatrix);
    const percentageCorrect = (correctWordCount / totalWordCount) * 100;
    setPercentageCorrect(percentageCorrect);

    if (percentageCorrect >= 80) {
      setCompleated(true); // Only mark completed if 80% of words are correct
    } else {
      setCompleated(false); // Do not mark completed otherwise
    }
  };

  function checkAndUpdate(arr) {
    const words = extractWords(arr); // Group cells by word (horizontal and vertical)
  
    words.forEach((wordObj) => {
      const { cells, answer } = wordObj;
  
    
  
      // Update each cell's correct status based on whether each individual letter is correct
      cells.forEach((cell, index) => {
        // Mark individual cells as correct or incorrect based on the letter
        cell.correct = cell.current && cell.current.toLowerCase() === answer[index].toLowerCase();
      });
  
    
    });
  
    return arr;
  }

  // Count how many words are completely correct
  function countCorrectWords(arr) {
    const words = extractWords(arr);
    console.log(words);
    return words.filter((wordObj) =>
      wordObj.cells.every((cell) => cell.correct) // Only count fully correct words
    ).length;
  }

  // Count total number of words in the grid
  function countTotalWords(arr) {
    return extractWords(arr).length;
  }
 function extractWords(arr) {
  const words = [];

  // Extract horizontal words
  arr.forEach((row) => {
    let word = [];
    row.forEach((cell) => {
      if (typeof cell === "object" && cell.answer) {
        word.push(cell);
      } else if (word.length > 0) {
        if (word.length > 1) words.push(getWordObject(word)); // Add valid word
        word = []; // Reset the word when hitting a non-word cell
      }
    });
    if (word.length > 1) {
      words.push(getWordObject(word)); // Push the last word in the row if it's valid
    }
  });

  // Extract vertical words 
  for (let col = 0; col < arr[0].length; col++) {
    let word = [];

    for (let row = 0; row < arr.length; row++) {
      const cell = arr[row][col];

      if (typeof cell === "object" && cell.answer) {
        word.push(cell); // Add the current cell to the word
      } else if (word.length > 0) {
        if (word.length > 1) words.push(getWordObject(word)); // Add valid word
        word = []; // Reset the word when hitting a non-word cell
      }
    }
    if (word.length > 1) {
      words.push(getWordObject(word)); // Push the last word in the column if it's valid
    }
  }

  const splitWords = splitCombinedWords(words);

  return splitWords;
}
  
function splitCombinedWords(words) {
  const result = [];

  words.forEach((wordObj) => {
    const { answer, cells } = wordObj;

    // Regular expression to detect where capital letters occur in the answer
    const splitIndices = [...answer.matchAll(/[A-Z]/g)].map(match => match.index);

    if (splitIndices.length > 1) {
      // Split the word at the capital letters (excluding the first one)
      let start = 0;

      splitIndices.forEach((index, idx) => {
        if (idx > 0) {
          const splitCells = cells.slice(start, index);
          const splitAnswer = answer.slice(start, index);
          result.push({ cells: splitCells, answer: splitAnswer });
          start = index;
        }
      });

      // Add the last segment
      result.push({ cells: cells.slice(start), answer: answer.slice(start) });
    } else {
      result.push(wordObj); // If no split needed, just add the word as is
    }
  });

  return result;
}
  
  // Helper function to create the word object
  function getWordObject(wordCells) {
    const answer = wordCells.map((cell) => cell.answer).join(""); // Combine the letters to form the full word
    return { cells: wordCells, answer };
  }
  
  function getAnswer(hint) {
    return gameData.basegame.word_definitions.find((item) => item.Definition === hint);
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
    hints.horizontal.sort((a, b) => a.number - b.number);
    hints.vertical.sort((a, b) => a.number - b.number);

    return hints;
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
    if (compleated) {
      saveGradeToBackend(percentage); // Only save the grade if the game is completed
    }
    onNextLesson(); // Proceed to the next lesson
  };


  return (
    <div>
      <div>
        <div className="flex">
          <div className="max-h-[100vh] flex items-center justify-center overflow-y-auto">
            <Crossword
              compleated={compleated}
              gameData={gameData}
              setFilteredMatrix={setFilteredMatrix}
              filteredMatrix={filteredMatrix}
              onNextLesson={handleNextLesson}
              isLastLesson={isLastLesson}
             
            />
          </div>

          <div className="w-[600px] ml-2">
            <div className="flex items-center justify-end">
              <button
                className="linearGradient_ver1 px-3 py-1 rounded-full font-semibold text-white hover:scale-[1.03] transition-all"
                onClick={checkAnswers}
              >
                Check Answers
              </button>
            </div>
            <p className="font-semibold text_linearGradient_ver1">Vertical</p>
            <div className="bg-zinc-50 p-2 rounded-lg">
              {answersHintsObj &&
                answersHintsObj.vertical.map((item, i) => (
                  <div key={i + "" + item.number}>
                    <span className="mr-1 font-semibold text-xs">{item.number}.</span>
                    <span className="text-sm">{item.hint}</span>
                  </div>
                ))}
            </div>

            <p className="font-semibold text_linearGradient_ver1">Horizontal</p>
            <div className="bg-zinc-50 p-2 rounded-lg">
              {answersHintsObj &&
                answersHintsObj.horizontal.map((item, i) => (
                  <div key={i + "" + item.number}>
                    <span className="mr-1 font-semibold text-xs">{item.number}.</span>
                    <span className="text-sm">{item.hint}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Crossword = ({ gameData, setFilteredMatrix, filteredMatrix, compleated, onNextLesson, isLastLesson,correctWordCount }) => {
  const gridCrossWord = gameData.game.crossword.grid;

  let lastId = 0;
  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36);
    const id = (lastId++).toString(36);
    return `${timestamp}-${id}`;
  };

  const updateItemById = (ref, newValue) => {
    const updatedMatrix = filteredMatrix.map((row) =>
      row.map((cell) => (cell.ref === ref ? { ...cell, current: newValue } : cell))
    );
    setFilteredMatrix(updatedMatrix);

  };

  function getAnswer(hint) {
    return gameData.basegame.word_definitions.find((item) => item.Definition === hint);
  }

  // The function that provides hint info
  function getHintInfo(number) {
    const referenceObject = gameData.game.crossword.hints;
    const horizontalEntry = referenceObject.horizontal.find((entry) => entry.number === number);
    if (horizontalEntry) {
      return { type: "horizontal", hint: horizontalEntry.hint };
    }
    const verticalEntry = referenceObject.vertical.find((entry) => entry.number === number);
    if (verticalEntry) {
      return { type: "vertical", hint: verticalEntry.hint };
    }
    return { type: "unknown", hint: "Number not found in referenceObject" };
  }


  useEffect(() => {
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

      toLinkVertical.forEach((link) => {
        for (let k = 1; k < link.word.length; k++) {
          const newRow = link.row + k;
          const newCol = link.col;

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
        .filter((colIndex) => newMatrix.some((row) => row[colIndex] !== "" && row[colIndex] !== " "));

      return newMatrix.map((row) => columnsToKeep.map((colIndex) => row[colIndex]));
    };

    const grid = generateGrid(gridCrossWord);
    setFilteredMatrix(grid);
  }, [gridCrossWord]);

  return (
    <div className="relative">
      {compleated && (
        <div className="absolute h-full w-full bg-[#0005] z-30 rounded-lg flex flex-col items-center justify-center amin-compleated-crossword">
          <FaCheckCircle className="text-3xl text-white" />
          <p className="mt-1 font-bold text-white">COMPLETED!</p>
          <button
            onClick={onNextLesson}
            className="linearGradient_ver1 px-3 rounded-full font-semibold text-white hover:scale-[1.01] transition-all flex items-center justify-center mt-4"
          >
            {isLastLesson ? "Complete Course" : "Next"}
          </button>
        </div>
      )}
      <div className="max-h-[60vh] overflow-y-auto">
        <table className="table-auto border-collapse border-gray-400 bg-zinc-300 rounded-lg crossword-table">
          <tbody>
            {filteredMatrix &&
              filteredMatrix.map((row, rowIndex) => {
                if (row.every((cell) => cell === "")) {
                  return null;
                }
                return (
                  <tr key={rowIndex} className="border-gray-400">
                    {row.map((cell, cellIndex) => {
                      if (cell !== "") {
                        return (
                          <td key={cellIndex} className="cell-undefined border-gray-400 cell cursor-pointer">
                            <div className="relative w-full h-full p-[0.13rem]">
                              <input
                                type="text"
                                maxLength="1"
                                className={`${
                                  cell.correct ? "bg-green-300 text-white anim-cell-crossword" : "bg-zinc-100 text-black"
                                } font-bold border-b-2 border-zinc-400 text-xl h-full w-full focus:outline-none rounded-lg text-center focus:scale-[1.08] transition-all`}
                                value={cell.current ? cell.current : ""}
                                onChange={(e) => {
                                  updateItemById(cell.ref, e.target.value.toUpperCase());
                                  if (e.target.value.length === 1) {
                                    const nextInput = e.target.nextElementSibling;
                                    if (nextInput && nextInput.tagName === "INPUT") {
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
                          <td key={cellIndex} className="cell p-[0.13rem]">
                            <div className="h-full bg-zinc-300 border-2 w-full rounded-lg"></div>
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
    </div>
  );
};

export default CrosswordPlayable;
