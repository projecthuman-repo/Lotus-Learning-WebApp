import "./App.css";
//import CourseBox from "./components/Course-Box/CourseBox";
import Header from "./components/Header-Components/Logged-In/Header-Logged-In";
// import SideNav from "./components/Side-Nav-bar/Side-Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import LearnersInfo from "./components/Profile-Learners-Info/LearnersInfo";
// import PersonalProfile from "./components/Personal-Profile-Components/PersonalProfile";


function App() {
  return (
    <>
      <Header />
      <LearnersInfo />
    </>
  );
}

export default App;
