import "./App.css";
//import CourseBox from "./components/Course-Box/CourseBox";
import Header from "./components/Header-Components/Logged-In/Header-Logged-In";
// import SideNav from "./components/Side-Nav-bar/Side-Nav";
import "bootstrap/dist/css/bootstrap.min.css";
//import LearnersSignUp from "./Pages/Learners-Sign-Up/Learners-Sign-Up.js"
import GameBox from "./components/Game-Box/GameBox";
import LearnersInfo from "./components/Profile-Learners-Info/LearnersInfo";
import LearnersAccount from "./Pages/Learners-Account/LearnersAccount";
import LearnersHelp from "./Pages/Learners-Help/LearnersHelp";
// import PersonalProfile from "./components/Personal-Profile-Components/PersonalProfile";




function App() {
  return (
    <>
      <LearnersHelp></LearnersHelp>
    </>
  );
}

export default App;
