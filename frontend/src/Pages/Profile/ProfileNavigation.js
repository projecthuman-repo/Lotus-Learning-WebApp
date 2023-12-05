import { Navigate } from "react-router-dom";

import CourseEditing from "../Educators/ProfileScreens/CourseEditing/CourseEditing";
import EducatorProfileHome from "../Educators/ProfileScreens/EducatorProfileHome/EducatorProfileHome";
import GameEditing from "../Educators/ProfileScreens/GameEditing/GameEditing";
import ProfileAccount from "../Learners/ProfileScreens/Profile-Account/ProfileAccount";
import ProfileGames from "../Learners/ProfileScreens/Profile-Games/ProfileGames";
import ProfileHelp from "../Learners/ProfileScreens/Profile-Help/ProfileHelp";
import ProfileHome from "../Learners/ProfileScreens/Profile-Home/ProfileHome";
import ProfileLibrary from "../Learners/ProfileScreens/Profile-Library/ProfileLibrary";
import ProfileMyCourse from "../Learners/ProfileScreens/Profile-MyCourses/ProfileMyCourse";
import ProfileNotifications from "../Learners/ProfileScreens/Profile-Notifications/ProfileNotifications";
import ProfilePrivacy from "../Learners/ProfileScreens/Profile-Privacy/ProfilePrivacy";
import EducatorAccount from "../Educators/ProfileScreens/EducatorAccount/EducatorAccount";

const courses = [
  {
    title: "Title of Course",
    name: "Art History",
    progress: 95,
    creator: "Name of Creator",
    description: "Description of the game",
    tags: ["Math", "Strategy", "Puzzle"],
  },
  {
    title: "Title of Course",
    name: "Art History",
    progress: 65,
    creator: "Name of Creator",
    description: "Description of the game",
    tags: ["Math", "Strategy", "Puzzle"],
  },
  {
    title: "Title of Course",
    name: "Art History",
    progress: 20,
    creator: "Name of Creator",
    description: "Description of the game",
    tags: ["Math", "Strategy", "Puzzle"],
  },
];

export const setScreen = (key, accountType) => {
  switch (key) {
    case undefined:
      if (accountType === "Learner") {
        return <ProfileHome courses={courses} />;
      } else {
        return <EducatorProfileHome courses={courses} />;
      }
    case "mycourses":
      if (accountType === "Educator") {
        return <Navigate to={"/profile"} />;
      }
      return <ProfileMyCourse courses={courses} />;
    case "games":
      if (accountType === "Educator") {
        return <Navigate to={"/profile"} />;
      }
      return <ProfileGames courses={courses} />;
    case "library":
      return <ProfileLibrary courses={courses} />;
    case "notifications":
      return <ProfileNotifications />;
    case "account":
      if (accountType === "Learner") {
        return <ProfileAccount />;
      }
      return <EducatorAccount />;
    case "privacy&security":
      return <ProfilePrivacy />;
    case "help":
      return <ProfileHelp />;
    case "courseEditing":
      if (accountType === "Learner") {
        return <Navigate to={"/profile"} />;
      }
      return <CourseEditing courses={courses} />;
    case "gameEditing":
      if (accountType === "Learner") {
        return <Navigate to={"/profile"} />;
      }
      return <GameEditing courses={courses} />;
  }
};
