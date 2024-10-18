import React, { useEffect, useState } from "react";
import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import LearningPageSideMenu from "./LearningPageSideMenu";
import LearningMainContent from "./LearningMainContent";
import getEnrollmentData from "../../../../BackendProxy/courseProxy/getEnrollmentData"; // API to get enrollment data
import completeLesson from "../../../../BackendProxy/courseProxy/completeLesson"; // API to complete a lesson
import BarLoader from "../../../../components/loaders/BarLoader";
import { useNavigate, useSearchParams } from "react-router-dom";

const LearningCoursePage = ({ userId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id"); // Get the course ID from query parameters

  const [enrollmentData, setEnrollmentData] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isLastLesson, setIsLastLesson] = useState(false); // Track if it's the last lesson
  const [isMenuOpen, setIsMenuOpen] = useState(true); // State for menu visibility
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userId && courseId) {
      fetchEnrollmentData(userId, courseId);
    } else {
      console.error("Missing userId or courseId");
      setLoaded(true);
    }
  }, [userId, courseId]);

  const fetchEnrollmentData = async (userId, courseId) => {
    try {
      const { enrollment, course } = await getEnrollmentData(userId, courseId);
      console.log(enrollment)
      if (!enrollment || !course) {
        console.error("Enrollment or course data is missing or invalid");
        setLoaded(true);
        return;
      }

      const updatedLessons = course.lessons.map((lesson) => ({
        ...lesson,
        isCompleted: enrollment.completedLessons.includes(lesson._id.toString()),
      }));

      setEnrollmentData({
        ...enrollment,
        course: { ...course, lessons: updatedLessons },
      });

      // Set first lesson
      if (updatedLessons.length > 0) {
        setSelectedLesson(updatedLessons[0]);
        setCurrentLessonIndex(0);
      }

      setLoaded(true);
    } catch (error) {
      console.error("Error fetching enrollment data:", error);
    }
  };

  // Check if lesson content is available for the selected lesson
  const isValidLessonContent = (lesson) => {
    return lesson && lesson.lessonContent && Object.keys(lesson.lessonContent).length > 0;
  };

  useEffect(() => {
    if (enrollmentData && selectedLesson) {
      const allLessonsCompleted = enrollmentData.course.lessons.every(
        (lesson) => lesson.isCompleted
      );

      if (allLessonsCompleted) {
        setIsLastLesson(true);
      } else if (enrollmentData.course.lessons.length === 1) {
        setIsLastLesson(!selectedLesson.isCompleted);
      } else {
        const otherLessonsCompleted = enrollmentData.course.lessons
          .filter((lesson) => lesson._id !== selectedLesson._id)
          .every((lesson) => lesson.isCompleted);

        setIsLastLesson(otherLessonsCompleted && !selectedLesson.isCompleted);
      }
    }
  }, [enrollmentData, selectedLesson]);

  const markLessonAsCompleted = async (enrollmentId, courseId, lessonId) => {
    try {
      await completeLesson(enrollmentId, courseId, lessonId);
      console.log(`Lesson ${lessonId} marked as completed.`);
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
      throw error;
    }
  };

  const handleNextLesson = async () => {
    try {
      await markLessonAsCompleted(enrollmentData._id, courseId, selectedLesson._id);

      const updatedLessons = enrollmentData.course.lessons.map((lesson) => {
        if (lesson._id === selectedLesson._id) {
          return { ...lesson, isCompleted: true };
        }
        return lesson;
      });

      setEnrollmentData((prevState) => ({
        ...prevState,
        course: { ...prevState.course, lessons: updatedLessons },
      }));

      const allLessonsCompleted = updatedLessons.every((lesson) => lesson.isCompleted);

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
          const firstIncompleteLesson = updatedLessons.find((lesson) => !lesson.isCompleted);
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
                  courseLessons={enrollmentData.course.lessons}
                  selectedLesson={selectedLesson}
                  setSelectedLesson={(lesson) => {
                    const index = enrollmentData.course.lessons.indexOf(lesson);
                    setCurrentLessonIndex(index);
                    setSelectedLesson(lesson);
                  }}
                  somethingMenu={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
                {/* Perform lesson content validation here */}
                {isValidLessonContent(selectedLesson) ? (
                  <LearningMainContent
                    courseData={enrollmentData.course}
                    selectedLesson={selectedLesson}
                    onNextLesson={handleNextLesson}
                    isLastLesson={isLastLesson}
                    isMenuOpen={isMenuOpen}
                    enrollment={enrollmentData}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-red-500 font-semibold">Error: No content available for this lesson.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p>The content for this lesson hasn't been added yet.</p>
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
