import React, { useState } from "react";
import lotusLogo from '../../../../Images/lotusletters.webp';
import crosswordIcon from '../../../../Images/game-icons/crossword.webp';
import fillInBlanksIcon from '../../../../Images/game-icons/generate-fill-in-the-blanks.webp';
import mcqsIcon from '../../../../Images/game-icons/generate-mcqs.webp';
import wordDefIcon from '../../../../Images/game-icons/generate-word-definition-pairs.webp';
import wordsearchIcon from '../../../../Images/game-icons/wordsearch.webp';
import textIcon from '../../../../Images/game-icons/text_icon.webp';
import { FaFileAlt, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LearningPageSideMenu = ({ courseLessons, selectedLesson, setSelectedLesson }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className={`relative ${isMenuVisible ? "w-[450px]" : "w-0"} transition-width duration-300 border-r h-full`}>
      <div className="flex justify-between items-center py-3 px-2 border-b">
        {/* Logo */}
        <div onClick={() => navigate('/home')} className="flex items-center cursor-pointer">
          <img className="w-[50%]" src={lotusLogo} alt="Lotus Logo" />
        </div>

        <div onClick={toggleMenu} className="text-2xl cursor-pointer">
          {isMenuVisible ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      
      {isMenuVisible && (
        <div className="w-full h-[90%] bg-stone-400 relative overflow-y-auto border-t">
          {courseLessons.map((item) => (
            <div key={item._id}>
              <LessonItemList selectedLessonId={selectedLesson._id} setSelectedLesson={setSelectedLesson} lesson={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const LessonItemList = ({ lesson, selectedLessonId, setSelectedLesson }) => {

  const changeIcon = (item) => {
    if (item === undefined) {
      return textIcon;
    }

    switch (item) {
      case 'crossword':
        return crosswordIcon;
      case 'fillinblanks':
        return fillInBlanksIcon;
      case 'multiplechoice':
        return mcqsIcon;
      case 'worddefinition':
        return wordDefIcon;
      case 'wordsearch':
        return wordsearchIcon;
      default:
        return textIcon;
    }
  };

  // Function to get the user-friendly name of the game type
  const getGameTypeName = (item) => {
    if (!item) return ""; 

    switch (item) {
      case 'crossword':
        return 'Crossword';
      case 'fillinblanks':
        return 'Fill in the Blanks';
      case 'multiplechoice':
        return 'Multiple Choice';
      case 'worddefinition':
        return 'Word Definition';
      case 'wordsearch':
        return 'Word Search';
      default:
        return 'Text'; 
    }
  };

  return (
    <div 
      onClick={() => setSelectedLesson(lesson)} 
      className={`${(selectedLessonId === lesson._id) ? "bg-stone-200 " : ""} 
                  ${(lesson.isCompleted ? "bg-green-100" : "bg-[#fff] hover:bg-stone-100")} 
                  w-full h-[75px] border-b flex items-center justify-between px-2 cursor-pointer transition-all`}
    >
      <div className="flex flex-col">
        <p className="font-semibold">{lesson.title ? lesson.title : ""}</p>
        <p className="text-xs">
          {lesson.lessonContent?.linked_game 
            ? getGameTypeName(lesson.lessonContent.linked_game.type) 
            : "Text"}
        </p>
      </div>
      <div className="flex items-center">
        {/* Completion indicator (checkmark or icon) */}
        {lesson.isCompleted && (
          <span className="text-green-500 mr-2">✔️</span> 
        )}
        <div className="bg-stone-300 w-[40px] h-[40px] flex items-center justify-center p-1 rounded-full">
          <img src={lesson.lessonContent?.linked_game ? changeIcon(lesson.lessonContent.linked_game.type) : textIcon} alt="Lesson Icon" />
        </div>
      </div>
    </div>
  );
};

export default LearningPageSideMenu;
