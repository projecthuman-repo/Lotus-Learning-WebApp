import React, { useEffect, useState } from 'react';
import CourseGameCard from '../../../../components/Educators/CourseGameCard/CourseGameCard';
import AdmninCourseCard from '../../../../components/AdminCourseCard/AdmninCourseCard';

// MUI
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const CourseEditing = () => {
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
      description: 'Des  dfsdsfaiodfjsoijcription of the game',
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

  const [searchTerm, setSearchTerm] = useState('')
  const [displayList, setDisplayList] = useState(games)

  const handleFilter = (data, term) => {
    const sanitizedTerm = term.replace(/\s/g, ''); 
    return data.filter((item) => {
      const sanitizedTitle = item.title.replace(/\s/g, ''); 
      return sanitizedTitle.toLowerCase().includes(sanitizedTerm.toLowerCase());
    });
  };
  useEffect(() => {
    setDisplayList(handleFilter(games, searchTerm))
  },[searchTerm])

  return (
    <div className='py-4'>
      <div className='flex items-center justify-end p-3'>
        <Link to={'/profile/courseEditing/createCourse'} className='flex items-center justify-center space-x-2 border-normal-400 border-1 py-2 px-3 text-neutral-500 rounded-md text-sm hover:border-blue-300 hover:text-blue-400 transition-all ease duration-100'>
          <p>Create a course</p>
          <AddIcon />
        </Link>
      </div>
      <div className='flex mt-3'>
        <div className='borRadTop-20  border-b-2 border-black cursor-pointer'>
          <p className='text-md '>Active Courses</p>
        </div>

        <div className='borRadTop-20 mx-4 border-b-2 border-transparent cursor-pointer'>
          <p className='text-base '>Saved Courses</p>
        </div>

        <div className='ms-auto mb-2'>
          <div>
            <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder='Search Course' className='focus:outline-none p-1 text-sm'/>
            <SearchIcon style={{color: '#898989'}}/>
          </div>
        </div>
      </div>
      {/* <div className='bgc-lightGray'>
        {games.map()}
      </div> */}
      {/* <div className=' pt-3'>
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
      </div> */}
      <div className='min-h-[70vh] max-h-[100vh] overflow-auto'>
      {
      (displayList.length === 0) ?

      <p className=' text-center py-4 text-neutral-500 text-sm'>No  courses found</p>

      :
      
      displayList.map((game, index) => {
            return (
              <div
                className='col d-flex justify-content-center '
                key={index + game.title}
                >
                <AdmninCourseCard  item={game}/>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CourseEditing;
