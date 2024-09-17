// import React, { useState } from "react";
// import lotusLogo from '../../../../Images/lotusletters.webp'
// import crosswordIcon from '../../../../Images/game-icons/crossword.webp'
// import fillInBlanksIcon from '../../../../Images/game-icons/generate-fill-in-the-blanks.webp'
// import mcqsIcon from '../../../../Images/game-icons/generate-mcqs.webp'
// import wordDefIcon from '../../../../Images/game-icons/generate-word-definition-pairs.webp'
// import wordsearchIcon from '../../../../Images/game-icons/wordsearch.webp'
// import textIcon from '../../../../Images/game-icons/text_icon.webp'
// import { FaFileAlt } from "react-icons/fa";
// import { useLocation, useSearchParams } from 'react-router-dom';

// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import getCourseData from "../../../../BackendProxy/courseProxy/getCourseData";

// const LearningPageSideMenu = ({courseLessons, selectedLesson, setSelectedLesson}) => {

//   const navigate = useNavigate()


//   return (

//     <div className="w-[450px] border-r h-full">
//       <div onClick={() => {navigate('/home')}} className=" w-full  flex items-center justify-center py-3 cursor-pointer">
//         <img className="w-[50%]" src={lotusLogo}/>
//       </div>
//       <div className="w-full h-[90%] bg-stone-400 relative overflow-y-auto border-t">
//         {courseLessons.map((item, i) => {
//           return (
//             <div key={item._id}>
//                 <LessonItemList selectedLessonId={selectedLesson._id} setSelectedLesson={setSelectedLesson} lesson={item}/>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   );
// };

// const LessonItemList = ({lesson, selectedLessonId, setSelectedLesson}) => {


//   const changeIcon = (item) => {
//     if(item === undefined){
//       return textIcon
//     }

//     switch(item){
//       case 'crossword':
//         return crosswordIcon 
//       case 'fillinblanks':
//         return fillInBlanksIcon
//       case 'multiplechoice':
//         return mcqsIcon
//       case 'worddefinition':
//         return wordDefIcon
//       case 'wordsearch':
//         return wordsearchIcon
//       default: 
//         return textIcon; 

//     }
//   }

//   return (
//   <div onClick={() => setSelectedLesson(lesson)} className={`${(selectedLessonId === lesson._id)? "bg-stone-200 " : " bg-[#fff] hover:bg-stone-100" } w-full h-[75px]  border-b flex items-center justify-between px-2 cursor-pointer   transition-all`}>
//     <div>
//       <p className="font-semibold">{lesson.title? lesson.title : ""}</p>
//       <p className="text-xs">{lesson.lessonContent? lesson.lessonContent.type : ""}</p>
//     </div>
//     <div className="bg-stone-300 w-[40px] h-[40px] flex items-center justify-center p-1 rounded-full">

//       <img src={lesson.lessonContent.linked_game ? changeIcon(lesson.lessonContent.linked_game.type) : textIcon} alt="" srcset="" />
//     </div>
//   </div>
//   )
// };

// export default LearningPageSideMenu;




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
        <div onClick={() => navigate('/home')} className="flex items-center cursor-pointer">
          <img className="w-[50%]" src={lotusLogo} alt="Logo" />
        </div>
        <div onClick={toggleMenu} className="text-2xl cursor-pointer">
          {isMenuVisible ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      {isMenuVisible && (
        <div className="w-full h-[90%] bg-stone-400 relative overflow-y-auto border-t">
          {courseLessons.map((item, i) => (
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

  return (
    <div onClick={() => setSelectedLesson(lesson)} className={`${(selectedLessonId === lesson._id) ? "bg-stone-200" : "bg-[#fff] hover:bg-stone-100"} w-full h-[75px] border-b flex items-center justify-between px-2 cursor-pointer transition-all`}>
      <div>
        <p className="font-semibold">{lesson.title ? lesson.title : ""}</p>
        <p className="text-xs">{lesson.lessonContent ? lesson.lessonContent.type : ""}</p>
      </div>
      <div className="bg-stone-300 w-[40px] h-[40px] flex items-center justify-center p-1 rounded-full">
        <img src={lesson.lessonContent.linked_game ? changeIcon(lesson.lessonContent.linked_game.type) : textIcon} alt="Game Icon" />
      </div>
    </div>
  );
};

export default LearningPageSideMenu;





// import React, { useState } from "react";
// import lotusLogo from '../../../../Images/lotusletters.webp';
// import crosswordIcon from '../../../../Images/game-icons/crossword.webp';
// import fillInBlanksIcon from '../../../../Images/game-icons/generate-fill-in-the-blanks.webp';
// import mcqsIcon from '../../../../Images/game-icons/generate-mcqs.webp';
// import wordDefIcon from '../../../../Images/game-icons/generate-word-definition-pairs.webp';
// import wordsearchIcon from '../../../../Images/game-icons/wordsearch.webp';
// import textIcon from '../../../../Images/game-icons/text_icon.webp';
// import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and close icons
// import { useNavigate } from "react-router-dom";

// const LearningPageSideMenu = ({ courseLessons, selectedLesson, setSelectedLesson }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(true); // Initially, the menu is open (fixed and visible)
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       {/* Hamburger button */}
//       <div className="fixed top-4 left-4 z-50">
//         <button onClick={toggleMenu} className="text-3xl">
//           {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Toggle between hamburger and close icon */}
//         </button>
//       </div>

//       {/* Sidebar Menu */}
//       <div
//         className={`fixed left-0 top-0 h-full bg-white transition-transform transform ${
//           isMenuOpen ? "translate-x-0" : "-translate-x-full"
//         } w-[450px] border-r z-40`}
//       >
//         <div onClick={() => { navigate('/home'); toggleMenu(); }} className="w-full flex items-center justify-center py-3 cursor-pointer">
//           <img className="w-[50%]" src={lotusLogo} alt="Lotus Logo" />
//         </div>
//         <div className="w-full h-[90%] bg-stone-400 relative overflow-y-auto border-t">
//           {courseLessons.map((item) => (
//             <div key={item._id}>
//               <LessonItemList selectedLessonId={selectedLesson._id} setSelectedLesson={setSelectedLesson} lesson={item} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// const LessonItemList = ({ lesson, selectedLessonId, setSelectedLesson }) => {
//   const changeIcon = (item) => {
//     if (item === undefined) {
//       return textIcon;
//     }

//     switch (item) {
//       case 'crossword':
//         return crosswordIcon;
//       case 'fillinblanks':
//         return fillInBlanksIcon;
//       case 'multiplechoice':
//         return mcqsIcon;
//       case 'worddefinition':
//         return wordDefIcon;
//       case 'wordsearch':
//         return wordsearchIcon;
//       default:
//         return textIcon;
//     }
//   };

//   return (
//     <div
//       onClick={() => setSelectedLesson(lesson)}
//       className={`${
//         selectedLessonId === lesson._id ? "bg-stone-200" : "bg-[#fff] hover:bg-stone-100"
//       } w-full h-[75px] border-b flex items-center justify-between px-2 cursor-pointer transition-all`}
//     >
//       <div>
//         <p className="font-semibold">{lesson.title || ""}</p>
//         <p className="text-xs">{lesson.lessonContent ? lesson.lessonContent.type : ""}</p>
//       </div>
//       <div className="bg-stone-300 w-[40px] h-[40px] flex items-center justify-center p-1 rounded-full">
//         <img
//           src={lesson.lessonContent?.linked_game ? changeIcon(lesson.lessonContent.linked_game.type) : textIcon}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// };

// export default LearningPageSideMenu;


