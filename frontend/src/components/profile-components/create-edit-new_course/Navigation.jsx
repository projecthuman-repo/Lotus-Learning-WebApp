import { Navigate } from "react-router-dom";
import CreateEditHome from "./screens/CreateEditHome";
import CreateEditObjectives from "./screens/CreateEditObjectives";
import CreateEditProgramme from "./screens/create-edit-programme/CreateEditProgramme";
import CreateEditPrice from "./screens/CreateEditPrice";


export const checkScreen = (key, courseData, setCourseData) => {
  switch (key) {
    case undefined:
      return false;
    case "homePage":
      return <CreateEditHome courseData={courseData} setCourseData={setCourseData} />;
    case "objectives":
      return <CreateEditObjectives courseData={courseData} setCourseData={setCourseData} />;
    case "programme":
      return <CreateEditProgramme courseData={courseData} setCourseData={setCourseData} />;
    case "prices":
      return <CreateEditPrice courseData={courseData} setCourseData={setCourseData} />;
    default:
      return false;
  }
};
