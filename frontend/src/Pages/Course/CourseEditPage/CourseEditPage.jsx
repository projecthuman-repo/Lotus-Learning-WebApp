import React, { useEffect, useState } from 'react'
import GeneralNavbar from '../../../components/navbar/GeneralNavbar'
import LessonsList from './components/LessonsList'
import { useNavigate, useParams } from 'react-router-dom';
import getCourseData from '../../../BackendProxy/courseProxy/getCourseData';
import MainLessonContent from './components/MainLessonContent';

const CourseEditPage = () => {

  const { courseid } = useParams();

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [courseData, setCourseData] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(0)


  const fetchCourseData = async (id) => {
    try {
      const response = await getCourseData(id);
      setLoading(false);
      setCourseData(response.data);
      console.log(response.data);
    } catch (e) {
      setLoading(false);
      console.log(e);
      // navigate('/')
    }
  };

  const updateLessons = (newLessons) => {
    setCourseData(prevData => ({
      ...prevData,
      lessons: newLessons
    }));
  };

  useEffect(() => {
    if(!courseid){
        navigate('/user');
    }else{
        fetchCourseData(courseid);

    }
  },[])

  return (
    <div className='h-screen'>
        {
            loading?
            <div>sdaa</div>:
            <div className='h-full w-full flex justify-between '>
            <LessonsList lessons={courseData.lessons} updateLessons={updateLessons} setSelectedLesson={setSelectedLesson}/>
            <div className='w-full '>
                <MainLessonContent index={selectedLesson} updateLessons={updateLessons} lessons={courseData.lessons} lesson={courseData.lessons[selectedLesson]}/>
            </div>

        </div>
        }

    </div>
  )
}

export default CourseEditPage