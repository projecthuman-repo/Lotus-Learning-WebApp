import React from 'react'
import styled from 'styled-components';
import './GameBox.css'
import tempImage from './Temp-Image.jpg'

const GameBox = () => {

  const title = 'Title of Game'

  return (
    <><><><GameCard>
      <div className='table-border'>
        <img className='game-image' src={tempImage} alt={title} />
        <TitleHeader>
          <h5>Title of Game</h5>
          <p className='creator-name'><u>Name of Creator</u></p>
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
      </div>
    </GameCard><GameCard>
        <div className='table-border'>
          <img className='game-image' src={tempImage} alt={title} />
          <TitleHeader>
            <h5>Title of Game</h5>
            <p className='creator-name'><u>Name of Creator</u></p>
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
        </div>
      </GameCard></><GameCard>
        <div className='table-border'>
          <img className='game-image' src={tempImage} alt={title} />
          <TitleHeader>
            <h5>Title of Game</h5>
            <p className='creator-name'><u>Name of Creator</u></p>
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
        </div>
      </GameCard></><GameCard>
        <div className='table-border'>
          <img className='game-image' src={tempImage} alt={title} />
          <TitleHeader>
            <h5>Title of Game</h5>
            <p className='creator-name'><u>Name of Creator</u></p>
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
        </div>
      </GameCard></>
  )
}

export default GameBox;


const GameCard = styled.div`

  border: 1px solid #000000;
  border-radius: 10px;
  
  font-size: 14px;

  .table-border {
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .game-image {
    margin-right: 1rem;
    border-radius: 10px;

    max-width: 7rem;
    max-height: 7rem;
  }
`


const TitleHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 1rem;
`;


const GameDescription = styled.div`

  max-width: 400px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  //word-break: break-all;
  hyphens: auto;

  display: flex;
  flex-wrap: wrap;

  margin: 0 0.5rem;
`

const GameTagIcons = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;


`;

const TagIcons = styled.button`
  font-size: 10px;

  height: 2rem;
  border-radius: 21px;
  padding: 0 0.2rem;
  margin: 0.1rem 0.1rem;
`