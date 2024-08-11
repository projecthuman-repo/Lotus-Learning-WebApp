import React from 'react'
import CrosswordPlayable from '../../../Course/PlayableApiGame/CrosswordPlayable'
import FillInBlanksPlayable from '../../../Course/PlayableApiGame/FillInBlanksPlayable';
import MultipleChoicePlayable from '../../../Course/PlayableApiGame/MultipleChoicePlayable';
import WordDefinitionPlayable from '../../../Course/PlayableApiGame/WordDefinitionPlayable';
import PdfDisplayer from '../../../../components/display-pdf/PdfDisplayer';
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
        case 'worddefinition':
          return <WordDefinitionPlayable gameData={selectedLesson.lessonContent.linked_game.gameRes}/>
          // return wordDefIcon
        case 'wordsearch':
          // return wordsearchIcon
      }
    }else if (item === 'text'){
      return  <PdfDisplayer text={selectedLesson.lessonContent.base_content.text}/>
    }

  }

  const checkName = (item) => {
    if(item.type === "game"){
      switch(item.linked_game.type){
        case 'crossword':
          return "Crossword"
        case 'fillinblanks':
          return "Fill in blanks"
        case 'multiplechoice':
          return "Multiplechoice"
        case 'worddefinition':
          return "Word Definition"
        case 'wordsearch':
          return "Word Search"
      }
    }
    else if(item.type === "text"){
      return ''
    }

  }

  return (
    <div className='w-full'>

        <div className='py-2 w-full flex items-center justify-center  flex-col'>
            <p className='px-2 font-semibold w-full text-start'>{checkName(selectedLesson.lessonContent)}</p>
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