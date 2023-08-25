import React, { useEffect, useState } from 'react';

import './games.css';
import FilterSidebar from '../../../components/Filter-Sidebar/FilterSidebar';
import ProductCard from '../../../components/Product-Card/ProductCard';
import Pagination from '../../../components/Pagination/Pagination';
import Searchbar from '../../../components/Searchbar/Searchbar';
import fetchGames from '../../../helpers/api/fetchGames';

const Games = () => {
  const [currentPageGames, setCurrentPageGames] = useState([]);
  const [games, setCurrentGames] = useState([]);

  const author = JSON.parse(window.sessionStorage.getItem('author'));

  useEffect(() => {
    const setPosts = async () => {
      try {
        let data = await fetchGames();
        if (data.length > 0) {
          console.log(data);
          setCurrentGames(data);
          setCurrentPageGames(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // setCurrentPageGames(games);
    setPosts();
  }, []);

  const handleSetCurrentPageGames = (itemOffset, endOffset) => {
    const tempCurrentGames = games.slice(itemOffset, endOffset);
    setCurrentPageGames(tempCurrentGames);
  };

  // temporary data until we connect backend
  const filterSidebarProps = {
    title: 'Filters',
    filters: [
      {
        filterTitle: 'Difficulty',
        filterOptions: ['Easy', 'Intermediate', 'Advanced', 'Challenger'],
      },
      {
        filterTitle: 'Game Types',
        filterOptions: [
          'Action',
          'Adventure',
          'Board Games',
          'Cards',
          'Coding',
          'Driving',
          'Educational',
          'Matchmaking',
          'Platformer',
          'Puzzles',
          'Strategy',
          'Simulation',
          'Trivia',
          'Typing',
        ],
      },
    ],
  };

  // const games = [
  //   {
  //     title: 'Game 1',
  //     creator: author,
  //     description: 'Description of the game',
  //     tags: ['Math', 'Strategy', 'Puzzle'],
  //   },

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-10 col-md-8'>
          <h1 className='text-center mt-5 mb-4'>Games</h1>
          <Searchbar />
          <p className='fs-14 c-gray'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacus
            massa, hendrerit nec ex nec, commodo consectetur risus. Maecenas
            tempus urna sit amet scelerisque pharetra.{' '}
          </p>
        </div>
      </div>
      <div className='row justify-content-around mt-5'>
        <div className='col col-sm-4 col-md-3 col-xl-2'>
          <FilterSidebar filterSidebarProps={filterSidebarProps} />
        </div>
        <div className='col col-sm-7 col-md-9 col-xl-10 mt-5 mt-sm-0'>
          <div className='row row-cols-auto justify-content-center justify-content-sm-start'>
            {currentPageGames.map((game, index) => {
              return (
                <div className='col mb-3' key={index + game.title}>
                  <ProductCard product={game} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='row justify-content-center mt-3'>
        <div className='col-12'>
          <div className='d-flex justify-content-center'>
            <Pagination
              itemsPerPage={12}
              items={games}
              handleSetCurrentPageItems={handleSetCurrentPageGames}
            />
            {/* <p className='c-gray'>Previous Page</p>
            <p className='text-decoration-underline'>Next Page</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
