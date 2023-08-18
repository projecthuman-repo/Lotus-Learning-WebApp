import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import CourseBox from "./components/Course-Box/CourseBox";
// import Header from "./components/Header-Components/Logged-In/Header-Logged-In";
// import SideNav from "./components/Side-Nav-bar/Side-Nav";
import 'bootstrap/dist/css/bootstrap.min.css';

// import LearnersSignUp from './Pages/Learners-Sign-Up/Learners-Sign-Up.js';
// import GameBox from "./components/Game-Box/GameBox";
// import LearnersInfo from "./components/Profile-Learners-Info/LearnersInfo";
// import LearnersAccount from './Pages/Learners-Account/LearnersAccount';
// import SignUpPage from './Archived/Pages/Sign-Up-Page/SignUpPage';
// import PersonalProfile from "./components/Personal-Profile-Components/PersonalProfile";
// import CourseProgressPage2 from './Archived/Pages/Learners-CourseProgress/CourseProgressPage';
// import CourseSpecific from './Pages/Course-Specific/CourseSpecific';
// import LearnersProfileNotifications from './Pages/Learners-Profile-Notifications/LearnersProfileNotifications';

// import LearnersGamesPage from './Archived/Pages/Learners-Games/LearnersGamesPage.js';
// import LearnersLibrary from './Pages/Learners-Library/LearnersLibrary.js';

// import CourseCompletion from './Pages/Learners-CourseCompletion/CourseCompletion.js';
// import Header from './components/Header-Components/Logged-In/Header-Logged-In';
// import LearnersAccountPage from './Pages/Learners-Account/LearnersAccount';
// import LearnersHelp from './Pages/Learners-Help/LearnersHelp';
// import LearnersProfile from './Pages/Learners-Profile/Learners-Profile';
// import ProfileMyCourses from './Pages/Learners-Library/LearnersLibrary.js';
// import PrivacySecurity from './Pages/Learners-Privacy_Security/PrivacySecurity';

import Games from './Pages/Learners/Games/Games';
import Navbar from './components/Navbar/Navbar';
import Profile from './Pages/Learners/Profile/Profile';
import Contact from './Pages/Learners/Contact/Contact';
import CourseInfo from './Pages/Learners/Course-Catalogue/Course-Info/CourseInfo';
import AuthorInfo from './Pages/Learners/Course-Catalogue/Author-Info/AuthorInfo';

import CourseCatalogue from './Pages/Learners/Course-Catalogue/course-catalogue';

//temporary picture for user
import tempProfilePic from './Images/photo.png';
import Author from './Pages/Learners/Author/Author';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import { useState } from 'react';

function App() {
  //login authentification
  // const [token, setToken] = useState();
  // if (window.localStorage.getItem('token') === null) {
  //   return (
  //     <>
  //       <Login setToken={setToken} />
  //     </>
  //   );
  // }
  const user = {
    userId: 1,
    userFullName: 'John Doe',
    userType: 'Student/Learner',
    userEmail: 'johndoe@gmail.com',
    userPassword: '******',
    userPhoneNum: '416-111-1111',
    userCountry: 'Canada',
    userProvince: 'Ontario',
    userCity: 'Toronto',
    userProfilePic: tempProfilePic,
    userGender: 'Male',
  };

  const author = {
    userId: 1,
    userFullName: 'Professor Smith',
    userType: 'Educator',
    userEmail: 'johndoe@gmail.com',
    userPassword: '******',
    userPhoneNum: '416-111-1111',
    userCountry: 'Canada',
    userProvince: 'Ontario',
    userCity: 'Toronto',
    userProfilePic: tempProfilePic,
    userGender: 'Male',
    userRating: '4.6/5',
    userBio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in turpis et odio ullamcorper posuere. Aenean risus lectus, consequat eu gravida sed, congue et nisi. Etiam suscipit erat sit amet placerat lacinia.',
  };

  window.sessionStorage.setItem('author', JSON.stringify(author));
  window.sessionStorage.setItem('user', JSON.stringify(user));

  //write me a way to display the navbar component only if the user has successfully logged in

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        {/* <Route path='/course-catologue' element={<CourseCatalogue />} /> */}
        {/* <Route path='/signup' element={<SignUpPage />} /> */}
        {/* <Route path='/LearnersSignUp' element={<LearnersSignUp />} />
        <Route path='/personalprofile' element={<LearnersAccountPage />} />
        <Route path='/LearnersGamesPage' element={<LearnersGamesPage />} />
        <Route path='/ProfileMyCourses' element={<ProfileMyCourses />} /> */}
        {/* <Route path="/CourseProgress" element={<CourseProgessPage />} /> */}
        {/* <Route path='/LearnersLibrary' element={<LearnersLibrary />} />
        <Route path='/LearnersHelp' element={<LearnersHelp />} /> */}
        {/* <Route path='/coursecatalogue' element={<LearnersProfile />} /> */}
        <Route path='/learner-profile' element={<Profile />} />
        {/* <Route path='/CourseProgressPage2' element={<CourseProgressPage2 />} /> */}
        <Route path='/games' element={<Games />} />
        <Route path='/course-catalogue' element={<CourseCatalogue />} />

        <Route path='/contact' element={<Contact />} />
        <Route path='/CourseInfo' element={<CourseInfo />} />
        <Route path='/AuthorInfo' element={<AuthorInfo />} />
        {/* <Route
          path='/LearnersNotifications'
          element={<LearnersProfileNotifications />}
        /> */}
        {/* <Route path='/Security' element={<PrivacySecurity />} />
        <Route path='/CourseSpecific' element={<CourseSpecific />} /> */}

        <Route path='/author/:name' element={<Author />} />

        {/* Educator Routes */}
        <Route path='/educator-profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
