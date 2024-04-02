import React, { createContext, useState } from "react";
import CreateEditHome from "./screens/CreateEditHome";
import CreateEditObjectives from "./screens/CreateEditObjectives";
import CreateEditProgramme from "./screens/create-edit-programme/CreateEditProgramme";
import CreateEditPrice from "./screens/CreateEditPrice";
const Context = createContext();

const componentMapping = {
  homePage: CreateEditHome,
  objectives: CreateEditObjectives,
  programme: CreateEditProgramme,
  prices: CreateEditPrice
};

const Navigation = ({ screen, courseData, setCourseData }) => {
  const Component = componentMapping[screen];

  if (!Component) {
    return null;
  }

  return (
    <div >
      <Component courseData={courseData} setCourseData={setCourseData} />
    </div>
  );
};

export default Navigation;
