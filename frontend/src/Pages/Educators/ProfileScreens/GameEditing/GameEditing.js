import React from 'react';
import CourseGameCard from '../../../../components/Educators/CourseGameCard/CourseGameCard';

const GameEditing = () => {
  const games = [
    {
      title: 'Game 1',
      description: 'Description of the game',
      rating: '4.7',
    },
    {
      title: 'Game 2',
      description: 'Description of the game',
      rating: '4.7',
    },
    {
      title: 'Game 3',
      description: 'Description of the game',
      rating: '4.7',
    },
    {
      title: 'Game 4',
      description: 'Description of the game',
      rating: '4.7',
    },
    {
      title: 'Game 5',
      description: 'Description of the game',
      rating: '4.7',
    },
    {
      title: 'Game 6',
      description: 'Description of the game',
      rating: '4.7',
    },
  ];
  return (
    <div className='px-md-4'>
      <div className='d-flex mt-6'>
        <div className='bgc-lightGray borRadTop-20 px-4'>
          <p className='fs-20 fw-500'>Active Games</p>
        </div>

        <div className='bgc-lightGray borRadTop-20 px-4 ms-2'>
          <p className='fs-20 fw-500'>Saved Games</p>
        </div>

        <div className='ms-auto'>
          <btn className='btn btn-outline-danger'>Create a Game</btn>
        </div>
      </div>

      {/* <div className='bgc-lightGray'>
        {games.map()}
      </div> */}
      <div className='bgc-lightGray mt-6'>
        <div className='row row-cols-lg-2 row-cols-xxl-3  '>
          {games.map((game, index) => {
            return (
              <div
                className='col d-flex justify-content-center mb-3'
                key={index + game.title}
              >
                <CourseGameCard product={game} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameEditing;
