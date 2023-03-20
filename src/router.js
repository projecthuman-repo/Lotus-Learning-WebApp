import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LearnersProfile from "./Pages/Learners-Profile/Learners-Profile";
import SignUpPage from "./Pages/Sign-Up-Page/SignUpPage";
import PersonalProfile from "./components/Personal-Profile-Components/PersonalProfile";
import SearchBar from "./components/SearchBar-Components/SearchBar";

import BookMarkedCourses from "./components/Book-Marked-Courses/BookMarkedCourses";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/coursecatalogue" element={<LearnersProfile />} />
        <Route path="/personalprofile" element={<PersonalProfile />} />
        <Route path="/searchbar" element={<SearchBar />} />

        <Route path="/bookmarkedcourses" element={<BookMarkedCourses />} />
      </Routes>
    </BrowserRouter>
  );
}
