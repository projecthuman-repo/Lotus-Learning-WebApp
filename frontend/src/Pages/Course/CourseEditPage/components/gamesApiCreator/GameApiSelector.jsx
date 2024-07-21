import React, { useEffect, useState } from "react";
import crossWord_icon from "../../../../../Images/game-icons/crossword.webp";
import FillInBlanks_icon from "../../../../../Images/game-icons/generate-fill-in-the-blanks.webp";
import MCQS_icon from "../../../../../Images/game-icons/generate-mcqs.webp";
import WordDefinition_icon from "../../../../../Images/game-icons/generate-word-definition-pairs.webp";
import WordSearch_icon from "../../../../../Images/game-icons/wordsearch.webp";
import "./styles.css";
import { MainLessonContext } from "../../CourseEditPage";
import CrossWordEdit from "./CrossWordEdit";
import FillInBlanksEdit from "./FillInBlanksEdit";
import MultipleChoiceEdit from "./MultipleChoiceEdit";
import WordDefinitionEdit from "./WordDefinitionEdit";
import WordSearchEdit from "./WordSearchEdit";
import { generateCrossword, generateFillInBlanks, generateMCQS, generateWordDef } from "../../../../../BackendProxy/ai_api_connection/ai_api_connection";
import BarLoader from "../../../../../components/loaders/BarLoader";

const GameApiSelector = () => {
  const { index, updateLessons, lessons, lesson } = MainLessonContext();


  const updateLessonPropertyAtIndex = (property, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [property]: value,
    };
    updateLessons(updatedLessons);
  };

  const updateLessonGameContent = (property, value) => {
    const updatedLessonContent = {
      ...lesson.lessonContent,
      linked_game: {
        ...lesson.lessonContent.linked_game,
        [property]: value,
      },
    };
    updateLessonPropertyAtIndex("lessonContent", updatedLessonContent);
  };
  const updateLessonBase = (value) => {
    const updatedLessonContent = {
      ...lesson.lessonContent,
      linked_game: {
        ...value
      },
    };
    updateLessonPropertyAtIndex("lessonContent", updatedLessonContent);
  };

  const [phase, setPhase] = useState(1);
  const [loaded, setLoaded] = useState(false);



  // ========================================================= GAME FETCH FUNCTIONS START ========================================================= 
  const fetchCrosswordLocal = async () => {
    try {
      const res = await generateCrossword(
        lesson.lessonContent.base_content.material_id
      );
      setLoaded(true);
      updateLessonBase({gameRes: res, type: 'crossword'});
      // setGameData(res);
      return;
    } catch (error) {
      console.error("error at FetchGameApi", error);
    }
  };
  const fetchFillInBlanks = async () => {
    try {
      const res = await generateFillInBlanks(
        lesson.lessonContent.base_content.material_id
      );
      setLoaded(true);
      updateLessonBase({gameRes: res, type: 'fillinblanks'});
      // setGameData(res);
      return;
    } catch (error) {
      console.error("error at FetchGameApi", error);
    }
  }

  const fetchMCQS = async () => {
    try {
      const res = await generateMCQS(
        lesson.lessonContent.base_content.material_id
      );
      setLoaded(true);
      updateLessonBase({gameRes: res, type: 'multiplechoice'});
      // setGameData(res);
      return;
    } catch (error) {
      console.error("error at FetchGameApi", error);
    }
  }
  const fetchWordFetch = async () => {
    try {
      const res = await generateWordDef(
        lesson.lessonContent.base_content.material_id
      );
      setLoaded(true);
      updateLessonBase({gameRes: res, type: 'worddefinition'});
      // setGameData(res);
      return;
    } catch (error) {
      console.error("error at FetchGameApi", error);
    }
  }
  // ========================================================= GAME FETCH FUNCTIONS END ========================================================= 

  useEffect(() => {
    if(lesson.lessonContent.linked_game && lesson.lessonContent.linked_game.gameRes){
      setLoaded(true)
    }
  },[lesson])

  const fetchHandler = (type) => {

    switch (type) {
      case "crossword": 
        fetchCrosswordLocal();
        return;
      case "fillinblanks":
        fetchFillInBlanks();
        return;
      case "multiplechoice":
        fetchMCQS();
        return;
      case "worddefinition":
        fetchWordFetch();
        console.log('a');
      return;
      case "wordsearch":
        console.log('a');
      return;

    }
  }


  const checkGameType = (type) => {

    console.log(lesson.lessonContent.linked_game.gameRes);
    switch (type) {
      case "crossword":
        return (
          <>
            {!loaded ? (
              <div className="h-[250px] bg-stone-50 flex items-center justify-center">
                <BarLoader />
              </div>
            ) : (
              <CrossWordEdit gameData={lesson.lessonContent.linked_game.gameRes}/>
            )}
          </>
        );
      case "fillinblanks":
        return (
          <>
            {!loaded ? (
              <div className="h-[250px] bg-stone-50 flex items-center justify-center">
                <BarLoader />
              </div>
            ) : (
              <FillInBlanksEdit gameData={lesson.lessonContent.linked_game.gameRes}/>
            )}
          </>
        );
      case "multiplechoice":
        return (
          <>
            {!loaded ? (
              <div className="h-[250px] bg-stone-50 flex items-center justify-center">
                <BarLoader />
              </div>
            ) : (
              <MultipleChoiceEdit gameData={lesson.lessonContent.linked_game.gameRes}/>
            )}
          </>
        );
      case "worddefinition":
        return (
          <>
            {!loaded ? (
              <div className="h-[250px] bg-stone-50 flex items-center justify-center">
                <BarLoader />
              </div>
            ) : (
              <WordDefinitionEdit gameData={lesson.lessonContent.linked_game.gameRes}/>
            )}
          </>
        );
      case "wordsearch":
        return <WordSearchEdit />;
      default:
        return <div>none</div>;
    }
  };

  const phaseRenderer = (phase) => {
    switch (phase) {
      case 1:
        return (
          <Phase1
            lesson={lesson}
            setPhase={setPhase}
            fetchHandler={fetchHandler}
            updateLessonGameContent={updateLessonGameContent}
          />
        );
      case 2:
        return checkGameType(lesson.lessonContent.linked_game.type);
      default:
        return <div>none</div>;
    }
  };

  return <div>{phaseRenderer(phase)}</div>;
};

const Phase1 = ({ setPhase, updateLessonGameContent, fetchHandler, lesson }) => {
  const handleClick = (type) => {
    console.log(type);
    updateLessonGameContent("type", type);
    fetchHandler(type)
    setPhase(2);
  };

  useEffect(() => {
    if(lesson.lessonContent.linked_game && lesson.lessonContent.linked_game.gameRes){
      setPhase(2);
    }
  },[])

  return (
    <div className="h-[600px] w-full bg-stone-200">
      <div className="flex  h-full w-full">
        <Option
          icon={crossWord_icon}
          name={"Cross Word"}
          color={"bg-green-500"}
          secondColor={"bg-green-400"}
          handleClick={handleClick}
          type={"crossword"}
        />
        <Option
          icon={FillInBlanks_icon}
          name={"Fill In Blanks"}
          color={"bg-blue-500"}
          secondColor={"bg-blue-400"}
          handleClick={handleClick}
          type={"fillinblanks"}
        />
        <Option
          icon={MCQS_icon}
          name={"Multiple Choice"}
          color={"bg-red-500"}
          secondColor={"bg-red-400"}
          handleClick={handleClick}
          type={"multiplechoice"}
        />
        <Option
          icon={WordDefinition_icon}
          name={"Word Definition"}
          color={"bg-yellow-500"}
          secondColor={"bg-yellow-400"}
          handleClick={handleClick}
          type={"worddefinition"}
        />
        <Option
          icon={WordSearch_icon}
          name={"Word Search"}
          color={"bg-purple-500"}
          secondColor={"bg-purple-400"}
          handleClick={handleClick}
          type={"wordsearch"}
        />
      </div>
    </div>
  );
};

const Option = ({ icon, name, color, handleClick, type, secondColor }) => {
  return (
    <div
      onClick={() => handleClick(type)}
      className={`${secondColor} flex flex-col items-center justify-between w-full hover:w-[150%] transition-all cursor-pointer parent`}
    >
      <div className="h-4"></div>
      <div className="w-[90px]">
        <img className="w-full" src={icon} alt={name + "_icon"} />
      </div>
      <div
        className={`${color} w-full  flex justify-center items-center text-white font-semibold text-xl child transition-all`}
      >
        <p className="text-center">{name}</p>
      </div>
    </div>
  );
};

export default GameApiSelector;
