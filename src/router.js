import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LearnersProfile from "./Pages/Learners-Profile/Learners-Profile";
import SignUpPage from "./Pages/Sign-Up-Page/SignUpPage";
import CourseProgressPage2 from "./Pages/Learners-CourseProgress/CourseProgressPage";
// import SearchBar from "./components/SearchBar-Components/SearchBar";
// import CourseProgessPage from "./Pages/Learners-CourseProgress/CourseProgressPage.js";
import LearnersHelp from "./Pages/Learners-Help/LearnersHelp";

import LearnersProfileNotifications from "./Pages/Learners-Profile-Notifications/LearnersProfileNotifications";
import PrivacySecurity from "./Pages/Learners-Privacy_Security/PrivacySecurity";
import LearnersAccountPage from "./Pages/Learners-Account/LearnersAccount";
import CourseSpecific from "./Pages/Course-Specific/CourseSpecific";
import LearnersSignUp from "./Pages/Learners-Sign-Up/Learners-Sign-Up";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/LearnersSignUp" element={<LearnersSignUp />} />
        <Route path="/personalprofile" element={<LearnersAccountPage />} />
        {/* <Route path="/CourseProgress" element={<CourseProgessPage />} /> */}
        <Route path="/LearnersHelp" element={<LearnersHelp />} />
        <Route path="/coursecatalogue" element={<LearnersProfile />} />
        <Route path="/CourseProgressPage2" element={<CourseProgressPage2 />} />
        <Route
          path="/LearnersNotifications"
          element={<LearnersProfileNotifications />}
        />
        <Route path="/Security" element={<PrivacySecurity />} />
        <Route path="/CourseSpecific" element={<CourseSpecific />} />

      </Routes>
    </BrowserRouter>
  );
}
