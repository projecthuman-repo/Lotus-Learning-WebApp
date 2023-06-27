import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import './course-catalogue.css';
import FilterSidebar from '../../../components/Filter-Sidebar/FilterSidebar';
import ProductCard from '../../../components/Product-Card/ProductCard';
import Pagination from '../../../components/Pagination/Pagination';

const Courses = () => {
  const [currentPageGames, setCurrentPageGames] = useState([]);

  const handleSetCurrentPageGames = (itemOffset, endOffset) => {
    const tempCurrentGames = games.slice(itemOffset, endOffset);
    setCurrentPageGames(tempCurrentGames);
  };

  // temporary data until we connect backend
  const filterSidebarProps = {
    title: 'Filters',
    filters: [
      {
        filterTitle: 'Alphabetical',
        filterOptions: ['A-Z', 'Z-A'],
      },
      {
        filterTitle: 'Age Range',
        filterOptions: [
          '13-15',
          '15-17',
          '17-19',
          '20+',
        ],
      },
        {
        filterTitle: 'Subject Types',
        filterOptions: [
            'Art',
            'Languages',
            'Coding',
            'Finances',
            'Geography',
            'History',
            'Philosophy',
            'Math',
            'Sciences',
            'Solar System',
            'VR',
        ],
        },
    ],
  };

  const games = [
    {
      title: 'Title of the Course',
      creator: 'Author Name',
      description: 'Description of the course',
      tags: ['Age', 'Subject', ],
    },
    {
        title: 'Title of the Course',
        creator: 'Author Name',
        description: 'Description of the course',
        tags: ['Age', 'Subject', ],
    },
    {
        title: 'Title of the Course',
        creator: 'Author Name',
        description: 'Description of the course',
        tags: ['Age', 'Subject', ],
    },
    {
        title: 'Title of the Course',
        creator: 'Author Name',
        description: 'Description of the course',
        tags: ['Age', 'Subject', ],
    },
    {
        title: 'Title of the Course',
        creator: 'Author Name',
        description: 'Description of the course',
        tags: ['Age', 'Subject', ],
    },
    {
        title: 'Title of the Course',
        creator: 'Author Name',
        description: 'Description of the course',
        tags: ['Age', 'Subject', ],
    },
    {
        title: 'Title of the Course',
        creator: 'Author Name',
        description: 'Description of the course',
        tags: ['Age', 'Subject', ],
    },
    {
        title: 'Title of the Course',
        creator: 'Author Name',
        description: 'Description of the course',
        tags: ['Age', 'Subject', ],
    },
  ];

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
        <div className='col-10 col-md-8'>
          <h1 className='text-center mt-5 mb-4'>Course Catalogue</h1>
          <div className='input-group search-bar mb-3 border border-2'>
            <span className='input-group-text search-icon border-0'>
              <BiSearch size={25} />
            </span>

            <input type='text' className='form-control search-input border-0' />
            <span className='input-group-text border-0'>Search</span>
          </div>
          <p className='fs-14 c-gray'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacus
            massa, hendrerit nec ex nec, commodo consectetur risus. Maecenas
            tempus urna sit amet scelerisque pharetra.{' '}
          </p>
        </div>
      </div>
      <div className='row justify-content-around mt-5'>
        <div className='col-4 col-md-3 col-xl-2'>
          <FilterSidebar filterSidebarProps={filterSidebarProps} />
        </div>
        <div className='col-7 col-md-9 col-xl-10'>
          <div className='row row-cols-auto justify-content-center'>
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
              itemsPerPage={9}
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

export default Courses;
