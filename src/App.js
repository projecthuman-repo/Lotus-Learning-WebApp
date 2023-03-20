import "./App.css";
//import CourseBox from "./components/Course-Box/CourseBox";
import Header from "./components/Header-Components/Logged-In/Header-Logged-In";
// import SideNav from "./components/Side-Nav-bar/Side-Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import BookMarkedCourses from "./components/Book-Marked-Courses/BookMarkedCourses";
// import BookMarkedCourses from "./components/Book-Marked-Courses/BookMarkedCourses";


function App() {
  return (
    <>
      <BookMarkedCourses />
    </>
  );
}

export default App;
