import "./App.css";
// import CourseBox from "./components/Course-Box/CourseBox";
import Header from "./components/Header-Components/Logged-In/Header-Logged-In";
// import SideNav from "./components/Side-Nav-bar/Side-Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import LearnersSignUp from "./Pages/Learners-Sign-Up/Learners-Sign-Up.js"

function App() {
  return (
    <>
      <Header />

      <LearnersSignUp />
    </>
  );
}

export default App;
