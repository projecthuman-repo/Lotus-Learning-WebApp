import React from 'react';
import CrosswordPlayable from '../../../Course/PlayableApiGame/CrosswordPlayable';
import FillInBlanksPlayable from '../../../Course/PlayableApiGame/FillInBlanksPlayable';
import MultipleChoicePlayable from '../../../Course/PlayableApiGame/MultipleChoicePlayable';
import WordDefinitionPlayable from '../../../Course/PlayableApiGame/WordDefinitionPlayable';
import PdfDisplayer from '../../../../components/display-pdf/PdfDisplayer';

const LearningMainContent = ({ selectedLesson }) => {
  
  const lessonContent = selectedLesson?.lessonContent;

  const switchContent = (item) => {
    if (item === undefined) {
      return '';
    }
    if (item === 'game') {
      switch (selectedLesson.lessonContent.linked_game.type) {
        case 'crossword':
          return (
            <CrosswordPlayable gameData={selectedLesson.lessonContent.linked_game.gameRes} />
          );
        case 'fillinblanks':
          return (
            <FillInBlanksPlayable gameData={selectedLesson.lessonContent.linked_game.gameRes} />
          );
        case 'multiplechoice':
          return (
            <MultipleChoicePlayable gameData={selectedLesson.lessonContent.linked_game.gameRes} />
          );
        case 'worddefinition':
          return (
            <WordDefinitionPlayable gameData={selectedLesson.lessonContent.linked_game.gameRes} />
          );
        case 'wordsearch':
          return 'Word Search'; 
        default:
          return 'Unsupported game type';
      }
    } else if (item === 'text') {
      return <PdfDisplayer text={selectedLesson.lessonContent.base_content.text} />;
    }
  };

  const checkName = (item) => {
    if (item === undefined) {
      return '';
    }
    if (item.type === 'game') {
      switch (item.linked_game.type) {
        case 'crossword':
          return 'Crossword';
        case 'fillinblanks':
          return 'Fill in blanks';
        case 'multiplechoice':
          return 'Multiple Choice';
        case 'worddefinition':
          return 'Word Definition';
        case 'wordsearch':
          return 'Word Search';
        default:
          return 'Unknown Game';
      }
    } else if (item.type === 'text') {
      return 'Text Content';
    }
  };

  return (
    <div className='w-full'>

        {/* Move the title section to the top */}
        <div className='flex flex-col p-2'>
            <p className='text-lg font-semibold'>Title</p>
            <p className='text-sm'>English text</p>
        </div>
  
        {/* Rest of the content */}
        <div className='py-2 w-full flex items-center justify-center flex-col'>
            <p className='px-2 font-semibold w-full text-start'>{selectedLesson.lessonContent.linked_game ? checkName(selectedLesson.lessonContent) : ''}</p>
            {switchContent(selectedLesson.lessonContent.type)}
        </div>

    </div>
  );

};

export default LearningMainContent;



