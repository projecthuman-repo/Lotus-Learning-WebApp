import React, { useState } from 'react'
import { FaChevronLeft,FaChevronRight} from "react-icons/fa";

const MultipleChoiceEdit = ({gameData}) => {

  
  const [questionOn, setQuestionOn] = useState(0)

  const handleNext = () => {
    if(questionOn >= gameData.game.mcqs.length-1){
      return
    }
    setQuestionOn(questionOn + 1)
    return;
  }
  const handlePrev = () => {
    if(questionOn === 0){
      return
    }
    setQuestionOn(questionOn - 1)
    return;
  }
  return (
    <div className='h-[500px] bg-zinc-50 flex items-center justify-center flex-col'>
      <div className="w-full text-center bg-zinc-50 text-zinc-300  font-smibold">
        Teacher View
      </div>
      <div className='h-full w-full relative'>
        <div onClick={() => handlePrev()} className='absolute top-[25%] left-10 hover:cursor-pointer hover:bg-zinc-200 p-2  rounded-full no-select'>
          <FaChevronLeft/>
        </div>
        <QuestionView item={gameData.game.mcqs[questionOn]} current={questionOn} game={gameData.game.mcqs}/>
        <div onClick={() => handleNext()}  className='no-select absolute top-[25%] right-10 hover:cursor-pointer hover:bg-zinc-200 p-2 rounded-full'>
          <FaChevronRight/>
        </div>
      </div>

    </div>
  )
}

const QuestionView = ({item, current, game}) => {

  return(
    <div className='w-full h-full flex flex-col justify-between items-center'>
    <div className='flex items-center justify-center h-full flex-col'>
      <p className='font-semibold text-3xl text-zinc-700'>{item.Question}</p>
      <p className='bg-black textwhite px-3 py-1 rounded-full text-white font-semibold text-xs'>
        Answer
        <span className='mx-1'>{item.Answer}</span>
      </p>
      <p className='bg-black textwhite px-3 py-1 rounded-full text-white font-semibold text-xs mt-1'>{current+1}/{game.length}</p>
    </div>
    <div className='w-full grid grid-cols-2 gap-2 p-2'>

      <div className='bg-blue-500 w-full h-[100px] border-b-4 border-blue-600 flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer'>{item.A}</div>
      <div className='bg-yellow-500 w-full border-b-4 border-yellow-600 h-[100px] flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer'>{item.B}</div>
      <div className='bg-red-500 w-full border-b-4 border-red-600 h-[100px] flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer'>{item.C}</div>
      <div className='bg-green-500 w-full border-b-4 border-green-600 h-[100px] flex items-center justify-center p-3 rounded-lg text-white font-semibold text-lg hover:scale-[1.02] transition-all cursor-pointer'>{item.D}</div>
    </div>
  </div>
  )
}

export default MultipleChoiceEdit