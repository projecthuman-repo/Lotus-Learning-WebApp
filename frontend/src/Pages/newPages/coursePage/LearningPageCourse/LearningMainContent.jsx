import React from 'react'
import CrosswordPlayable from '../../../Course/PlayableApiGame/CrosswordPlayable'
import FillInBlanksPlayable from '../../../Course/PlayableApiGame/FillInBlanksPlayable';
import MultipleChoicePlayable from '../../../Course/PlayableApiGame/MultipleChoicePlayable';
const LearningMainContent = ({selectedLesson, gameData}) => {


  console.log(selectedLesson);
  const switchContent = (item) => {
    if(item === 'game'){
      switch(selectedLesson.lessonContent.linked_game.type) {
        case 'crossword':
          return <CrosswordPlayable gameData={selectedLesson.lessonContent.linked_game.gameRes}/> 
        case 'fillinblanks':
          return <FillInBlanksPlayable gameData={selectedLesson.lessonContent.linked_game.gameRes}/>
        case 'multiplechoice':
          return <MultipleChoicePlayable gameData={selectedLesson.lessonContent.linked_game.gameRes}/>
          // return mcqsIcon
        case 'worddefinition':
          // return wordDefIcon
        case 'wordsearch':
          // return wordsearchIcon
      }
    }else{

    }

  }


  return (
    <div className='w-full'>

        <div className='py-2 w-full flex items-center justify-center  flex-col'>
            <p className='px-2 font-semibold w-full text-start'>Crossword</p>
            {switchContent(selectedLesson.lessonContent.type)}
        </div>
        <div className='flex flex-col p-2'>
            <p className='text-lg font-semibold'>Title</p>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, a. Optio eos deserunt vero adipisci, quam aliquid? Quod, quae eligendi nihil fuga nulla impedit? Culpa, sit vel. Eius, tempora sunt.</p>
        </div>
    </div>
  )
}

export default LearningMainContent