import { Navigate } from "react-router-dom";
import CourseHome from "./CourseCreationPages/CourseHome/CourseHome";
import CourseObjectives from "./CourseCreationPages/CourseObjectives/CourseObjectives";
import CourseProgramme from "./CourseCreationPages/CourseProgramme/CourseProgramme";
import CoursePrice from "./CourseCreationPages/CoursePrice/CoursePrice";


export const checkScreen = (key) => {

  switch (key) {
    case undefined:
      return false
    case "homePage":
      return <CourseHome/>
    case "objectives":
      return <CourseObjectives/> 
    case "programme":
      return <CourseProgramme/> 
    case "prices":
      return <CoursePrice/>
    default:
      return false

  }
};
