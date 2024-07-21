import React from 'react';

const WordDefinitionEdit = ({ gameData }) => {
  console.log('ss', gameData);
  
  const traverseGameObj = (wordDefinitions) => {
    const halfLength = Math.floor(wordDefinitions.length / 2);
    return wordDefinitions.slice(0, halfLength).map((wordDefinition, index) => (
      <GameObj key={index} wordDefinition={wordDefinition} />
    ));
  };

  return (
    <div className='h-[500px] bg-zinc-50 flex items-center justify-center'>
      <div className='bg-white p-3 rounded-lg'>
        {traverseGameObj(gameData.game.word_definitions)}
      </div>
    </div>
  );
};

const GameObj = ({ wordDefinition }) => {
  return (
    <div>
      <p className='text-zinc-600'> {wordDefinition.Definition}</p>
      <div>
        <div className='flex items-center mt-1 '>
          <input className='text-center bg-zinc-50 border-b rounded-lg focus:outline-none py-1' placeholder='. . .'/>
          <p className='bg-zinc-500 text-white rounded-full px-3  mx-2 font-semibold'>{wordDefinition.Word}</p>
        </div>
      </div>
    </div>
  );
};

export default WordDefinitionEdit;
