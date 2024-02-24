import { Navigate } from "react-router-dom";
import CreateEditHome from "./screens/CreateEditHome";
import CreateEditObjectives from "./screens/CreateEditObjectives";
import CreateEditProgramme from "./screens/create-edit-programme/CreateEditProgramme";
import CreateEditPrice from "./screens/CreateEditPrice";



export const checkScreen = (key) => {

  switch (key) {
    case undefined:
      return false
    case "homePage":
      return <CreateEditHome/>
    case "objectives":
      return <CreateEditObjectives/> 
    case "programme":
      return <CreateEditProgramme/> 
    case "prices":
      return <CreateEditPrice/>
    default:
      return false

  }
};