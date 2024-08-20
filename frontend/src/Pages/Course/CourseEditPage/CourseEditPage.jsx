import React, { createContext, useContext, useEffect, useState } from 'react'
import GeneralNavbar from '../../../components/navbar/GeneralNavbar'
import LessonsList from './components/LessonsList'
import { useNavigate, useParams } from 'react-router-dom';
import getCourseData from '../../../BackendProxy/courseProxy/getCourseData';
import MainLessonContent from './components/MainLessonContent';
const MainContentContext = createContext();

const CourseEditPage = () => {

  const { courseid } = useParams();

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [courseData, setCourseData] = useState(null)
  const [baseCourseData, setBaseCourseData] = useState(null)
  const [changed, setChanged] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(0)


  const fetchCourseData = async (id) => {
    try {
      const response = await getCourseData(id);
      setLoading(false);
      setCourseData(response.data);
      setBaseCourseData(response.data)
      console.log('AAAAAAAAAAAAAAAAAAAAAAAA', response.data);
    } catch (e) {
      setLoading(false);
      console.log(e);
      // navigate('/')
    }
  };

  useEffect(() => {
    if(!changed && baseCourseData && courseData){
      if(JSON.stringify(baseCourseData) !== JSON.stringify(courseData)){
        setChanged(true)
      }
    }
      return 
  },[courseData])

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
            <LessonsList setBaseCourseData={setBaseCourseData} baseCourseData={baseCourseData} lesson={courseData.lessons[selectedLesson]} changed={changed} courseData={courseData} lessons={courseData.lessons} updateLessons={updateLessons} setSelectedLesson={setSelectedLesson}/>
            <MainContentContext.Provider value={{ index: selectedLesson, updateLessons, lessons: courseData.lessons, lesson: courseData.lessons[selectedLesson]}} className='w-full '>
                <MainLessonContent />
            </MainContentContext.Provider>

        </div>
        }

    </div>
  )
}
// index={selectedLesson} updateLessons={updateLessons} lessons={courseData.lessons} lesson={courseData.lessons[selectedLesson]}
export const MainLessonContext = () => {
  return useContext(MainContentContext);
};
export default CourseEditPage