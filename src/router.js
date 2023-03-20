import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LearnersProfile from "./Pages/Learners-Profile/Learners-Profile";
import SignUpPage from "./Pages/Sign-Up-Page/SignUpPage";
import PersonalProfile from "./components/Personal-Profile-Components/PersonalProfile";
import SearchBar from "./components/SearchBar-Components/SearchBar";
import CourseProgessPage from "./Pages/Learners-CourseProgress/CourseProgressPage.js";


import LearnersProfileNotifications from "./Pages/Learners-Profile-Notifications/LearnersProfileNotifications";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/coursecatalogue" element={<LearnersProfile />} />
        <Route path="/personalprofile" element={<PersonalProfile />} />
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="/LearnersNotifications" element={<LearnersProfileNotifications />}/>
        <Route path="/CourseProgress" element={<CourseProgessPage />}/>
      </Routes>
    </BrowserRouter>
  );
}
