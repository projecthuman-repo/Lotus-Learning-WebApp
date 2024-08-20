import React, { useEffect, useState } from "react";
import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import LearningPageSideMenu from "./LearningPageSideMenu";
import LearningMainContent from "./LearningMainContent";
import getCourseData from "../../../../BackendProxy/courseProxy/getCourseData";
import { useSearchParams } from "react-router-dom";
import BarLoader from "../../../../components/loaders/BarLoader";

const LearningCoursePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [courseData, setCourseData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    fetchData(id);
    console.log(id);
  }, []);

  const fetchData = async (id) => {
    try {
      const res = await getCourseData(id);
      setCourseData(res.data);
      setSelectedLesson(res.data.lessons[0]);
      console.log(res.data);
      setLoaded(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full h-full">
      <>
        {loaded ? (
          <div className="h-full flex flex-col md:flex-row w-full justify-between">
            <LearningPageSideMenu
              courseLessons={courseData.lessons}
              selectedLesson={selectedLesson}
              setSelectedLesson={setSelectedLesson}
              className="w-full md:w-1/4"
            />
            <LearningMainContent
              selectedLesson={selectedLesson}
              gameData={courseData.lessons[0].lessonContent.linked_game.gameRes}
              className="w-full md:w-3/4"
            />
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
