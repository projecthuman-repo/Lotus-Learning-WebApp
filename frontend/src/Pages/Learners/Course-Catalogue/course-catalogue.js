import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import './course-catalogue.css';
import FilterSidebar from '../../../components/Filter-Sidebar/FilterSidebar';
import ProductCard from '../../../components/Product-Card/ProductCard';
import Pagination from '../../../components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import fetchCourses from '../../../helpers/api/fetchCourses';
import Searchbar from '../../../components/Searchbar/Searchbar';
import CourseCard from '../../../components/CourseCard/CourseCard';

const Courses = () => {
  const [currentPageCourse, setCurrentPageCourses] = useState([]);
  const [courses, setCurrentCourses] = useState([]);

  const author = JSON.parse(window.sessionStorage.getItem('author'));

  useEffect(() => {
    const setPosts = async () => {
      try {
        let data = await fetchCourses();
        console.log(data);
        if (data.length > 0) {
          console.log(data);
          setCurrentCourses(data);
          setCurrentPageCourses(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // setCurrentPageGames(games);
    setPosts();
  }, []);

  const handleSetCurrentPageCourses = (itemOffset, endOffset) => {
    const tempCurrentGames = courses.slice(itemOffset, endOffset);
    setCurrentPageCourses(tempCurrentGames);
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
        filterOptions: ['13-15', '15-17', '17-19', '20+'],
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
          <h1 className='text-center mt-5 mb-4'>Course Catalogue</h1>
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
            {currentPageCourse.map((course, index) => {
              return (
                <div className='col mb-3' key={index + course.title}>
                  <CourseCard course={course} />
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
              items={courses}
              handleSetCurrentPageItems={handleSetCurrentPageCourses}
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
