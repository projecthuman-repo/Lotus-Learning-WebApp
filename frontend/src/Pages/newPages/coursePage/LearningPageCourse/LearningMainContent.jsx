import React from 'react';
import CrosswordPlayable from '../../../Course/PlayableApiGame/CrosswordPlayable';
import FillInBlanksPlayable from '../../../Course/PlayableApiGame/FillInBlanksPlayable';
import MultipleChoicePlayable from '../../../Course/PlayableApiGame/MultipleChoicePlayable';
import WordDefinitionPlayable from '../../../Course/PlayableApiGame/WordDefinitionPlayable';
import PdfDisplayer from '../../../../components/display-pdf/PdfDisplayer';

const LearningMainContent = ({ courseData, selectedLesson, onNextLesson, isLastLesson }) => {
  if (!courseData || !selectedLesson) {
    return <div>Loading content...</div>; // Fallback if courseData or selectedLesson is not yet available
  }

  const lessonContent = selectedLesson?.lessonContent;

  const switchContent = (item) => {
    if (!item) return '';

    if (item === 'game') {
      switch (selectedLesson.lessonContent.linked_game.type) {
        case 'crossword':
          return (
          
            <CrosswordPlayable 
              key={selectedLesson._id} 
              gameData={selectedLesson.lessonContent.linked_game.gameRes}
              onNextLesson={onNextLesson}  
              isLastLesson={isLastLesson}
              
            />
   
          );
        case 'fillinblanks':
          return (
            <FillInBlanksPlayable 
              key={selectedLesson._id} 
              gameData={selectedLesson.lessonContent.linked_game.gameRes}
              onNextLesson={onNextLesson}  
              isLastLesson={isLastLesson}
            />
          );
        case 'multiplechoice':
          return (
            <MultipleChoicePlayable 
              key={selectedLesson._id} 
              gameData={selectedLesson.lessonContent.linked_game.gameRes}
              onNextLesson={onNextLesson}  
              isLastLesson={isLastLesson}
            />
          );
        case 'worddefinition':
          return (
            <WordDefinitionPlayable 
              key={selectedLesson._id} 
              gameData={selectedLesson.lessonContent.linked_game.gameRes}
              onNextLesson={onNextLesson}  
              isLastLesson={isLastLesson}
            />
          );
        default:
          return 'Unsupported game type';
      }
    } else if (item === 'text') {
      return <PdfDisplayer text={selectedLesson.lessonContent.base_content.text} />;
    }
  };

  return (
    <div className='w-full mt-12'> {/* Add margin-top of 8 (2rem) */}
      <div className='flex flex-col p-2'>
        <p className='text-lg font-semibold'>Title</p>
        <p className='text-sm'>{courseData?.title || 'Untitled Course'}</p>
        <p className='text-lg font-semibold'>Description</p>
        <p className='text-sm'>{courseData?.description || 'No description available'}</p>
      </div>
      <div className='py-2 w-full flex items-center justify-center flex-col'>
        {switchContent(selectedLesson.lessonContent.type)}
      </div>
    </div>
  );
};

export default LearningMainContent;
