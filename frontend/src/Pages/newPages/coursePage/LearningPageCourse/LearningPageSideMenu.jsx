import React, { useState } from "react";
import lotusLogo from '../../../../Images/lotusletters.webp'
import crosswordIcon from '../../../../Images/game-icons/crossword.webp'
import fillInBlanksIcon from '../../../../Images/game-icons/generate-fill-in-the-blanks.webp'
import mcqsIcon from '../../../../Images/game-icons/generate-mcqs.webp'
import wordDefIcon from '../../../../Images/game-icons/generate-word-definition-pairs.webp'
import wordsearchIcon from '../../../../Images/game-icons/wordsearch.webp'
import { FaFileAlt } from "react-icons/fa";
import { useLocation, useSearchParams } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import getCourseData from "../../../../BackendProxy/courseProxy/getCourseData";

const LearningPageSideMenu = ({courseLessons, selectedLesson, setSelectedLesson}) => {

  const navigate = useNavigate()


  return (

    <div className="w-[450px] border-r h-full">
      <div onClick={() => {navigate('/home')}} className=" w-full  flex items-center justify-center py-3 cursor-pointer">
        <img className="w-[50%]" src={lotusLogo}/>
      </div>
      <div className="w-full h-[90%] bg-stone-400 relative overflow-y-auto border-t">
        {courseLessons.map((item, i) => {
          return (
            <div key={item._id}>
                <LessonItemList selectedLessonId={selectedLesson._id} setSelectedLesson={setSelectedLesson} lesson={item}/>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const LessonItemList = ({lesson, selectedLessonId, setSelectedLesson}) => {


  const changeIcon = (item) => {
    switch(item){
      case 'crossword':
        return crosswordIcon 
      case 'fillinblanks':
        return fillInBlanksIcon
      case 'multiplechoice':
        return mcqsIcon
      case 'worddefinition':
        return wordDefIcon
      case 'wordsearch':
        return wordsearchIcon

    }
  }

  return (
  <div onClick={() => setSelectedLesson(lesson)} className={`${(selectedLessonId === lesson._id)? "bg-stone-200 " : " bg-[#fff] hover:bg-stone-100" } w-full h-[75px]  border-b flex items-center justify-between px-2 cursor-pointer   transition-all`}>
    <div>
      <p className="font-semibold">{lesson.title}</p>
      <p className="text-xs">{lesson.lessonContent.type}</p>
    </div>
    <div className="bg-stone-300 w-[40px] h-[40px] flex items-center justify-center p-1 rounded-full">

      <img src={changeIcon(lesson.lessonContent.linked_game.type)} alt="" srcset="" />
    </div>
  </div>
  )
};

export default LearningPageSideMenu;
