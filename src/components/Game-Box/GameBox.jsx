import React from 'react'
import styled from 'styled-components';

const GameBox = () => {

  const title = 'Title of Game'

  return (
    <GameCard>
      <GameContent>
        <img className='game-image' src='Temp-Image.jpg' alt={title} />
        <TitleHeader>
          <h4>Title of Game</h4>
          <p><u>Name of Creator</u></p>
          <p>Completed: Jan 00, 20XX</p>
        </TitleHeader>
        <GameDescription>
          smelly donkey jumps over the fatigued cat and then meets the dirty fox who cleverly distinguishes
        </GameDescription>
        <GameTagIcons>
          <TagIcons>Math</TagIcons>
          <TagIcons>Strategy</TagIcons>
          <TagIcons>Puzzle</TagIcons>
        </GameTagIcons>
      </GameContent>
    </GameCard>
  )
}

export default GameBox;


const GameCard = styled.div`

  border: 1px solid #000000;
  border-radius: 10px;

  width: 75rem;
`;

const GameContent = styled.div`
  padding: 0.5rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid black;
`;


const GameDescription = styled.div`
  border: 1px solid black;

  max-width: 400px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  //word-break: break-all;
  hyphens: auto;

  display: flex;
  flex-wrap: wrap;
`

const GameTagIcons = styled.div`
  border: 1px solid black;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

`;

const TagIcons = styled.button`

  height: 2rem;
  border-radius: 21px;
  padding: 0 1.5rem;
  margin: 0.1rem 0.25rem;
`