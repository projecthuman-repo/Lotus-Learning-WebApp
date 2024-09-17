import React, { useEffect, useState } from "react";
import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import LearningPageSideMenu from "./LearningPageSideMenu";
import LearningMainContent from "./LearningMainContent";
import getCourseData from "../../../../BackendProxy/courseProxy/getCourseData";
import BarLoader from "../../../../components/loaders/BarLoader";
import completeLesson from "../../../../BackendProxy/courseProxy/completeLesson";
import { useNavigate, useSearchParams } from "react-router-dom";

const LearningCoursePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [courseData, setCourseData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isLastLesson, setIsLastLesson] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true); // State for menu visibility

  useEffect(() => {
    fetchData(id);
    console.log(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const res = await getCourseData(id);
      setCourseData(res.data);

      if (res.data.lessons && res.data.lessons.length > 0 && res.data.lessons[0].lessonContent) {
        setSelectedLesson(res.data.lessons[0]);
        setCurrentLessonIndex(0);
      } else {
        setSelectedLesson(null);
      }

      setLoaded(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  
  useEffect(() => {
    if (courseData && selectedLesson) {
      const allLessonsCompleted = courseData.lessons.every(lesson => lesson.isCompleted);

      if (allLessonsCompleted) {
        setIsLastLesson(true);
      } else if (courseData.lessons.length === 1) {
        setIsLastLesson(!selectedLesson.isCompleted);
      } else {
        const otherLessonsCompleted = courseData.lessons
          .filter(lesson => lesson._id !== selectedLesson._id)
          .every(lesson => lesson.isCompleted);
        setIsLastLesson(otherLessonsCompleted && !selectedLesson.isCompleted);
      }
    }
  }, [courseData, selectedLesson]);

  const markLessonAsCompleted = async (courseId, lessonId) => {
    try {
      await completeLesson(courseId, lessonId);
      console.log(`Lesson ${lessonId} marked as completed.`);
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
      throw error;
    }
  };

  const handleNextLesson = async () => {
    try {
      await markLessonAsCompleted(courseData._id, selectedLesson._id);

      const updatedLessons = courseData.lessons.map(lesson => {
        if (lesson._id === selectedLesson._id) {
          return { ...lesson, isCompleted: true };
        }
        return lesson;
      });

      setCourseData(prevState => ({
        ...prevState,
        lessons: updatedLessons,
      }));

      const allLessonsCompleted = updatedLessons.every(lesson => lesson.isCompleted);

      if (allLessonsCompleted) {
        navigate("/course-complete");
      } else {
        let nextLessonIndex = currentLessonIndex + 1;
        while (nextLessonIndex < updatedLessons.length && updatedLessons[nextLessonIndex].isCompleted) {
          nextLessonIndex++;
        }

        if (nextLessonIndex < updatedLessons.length) {
          const nextLesson = updatedLessons[nextLessonIndex];
          setCurrentLessonIndex(nextLessonIndex);
          setSelectedLesson(nextLesson);
        } else {
          const firstIncompleteLesson = updatedLessons.find(lesson => !lesson.isCompleted);
          const firstIncompleteLessonIndex = updatedLessons.indexOf(firstIncompleteLesson);
          setCurrentLessonIndex(firstIncompleteLessonIndex);
          setSelectedLesson(firstIncompleteLesson);
        }
      }
    } catch (error) {
      console.error("Failed to complete lesson and proceed:", error);
    }
  };

  return (
    <div className="w-full h-full">
      <>
        {loaded ? (
          <div className="h-full flex w-full justify-between">
            {selectedLesson ? (
              <>
                <LearningPageSideMenu
                  courseLessons={courseData.lessons}
                  selectedLesson={selectedLesson}
                  setSelectedLesson={(lesson) => {
                    const index = courseData.lessons.indexOf(lesson);
                    setCurrentLessonIndex(index);
                    setSelectedLesson(lesson);
                  }}
                  somethingMenu={isMenuOpen} 
                  setIsMenuOpen={setIsMenuOpen} 
                />
                <LearningMainContent
                  courseData={courseData}
                  selectedLesson={selectedLesson}
                  onNextLesson={handleNextLesson}
                  isLastLesson={isLastLesson}
                  isMenuOpen={isMenuOpen} 
                />
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p>The Content for this lesson hasn't been added yet.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <BarLoader />
          </div>
        )}
      </>
    </div>
  );
};

export default LearningCoursePage;
