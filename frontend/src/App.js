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
import Profile from './Pages/Profile/Profile';
import Contact from './Pages/Learners/Contact/Contact';
import CourseInfo from './Pages/Learners/Course-Catalogue/Course-Info/CourseInfo';
import AuthorInfo from './Pages/Learners/Course-Catalogue/Author-Info/AuthorInfo';

import CourseCatalogue from './Pages/Learners/Course-Catalogue/course-catalogue';

import Document from './Pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Document';
import Video from './Pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Video';
import Audio from './Pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Audio';
import Completed from './Pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Completed';
import ProfileHome from './Pages/Learners/ProfileScreens/Profile-Home/ProfileHome';

//temporary picture for user
import tempProfilePic from './Images/photo.png';
import Author from './Pages/Learners/Author/Author';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import { useEffect, useState } from 'react';
import Confetti from './Pages/Course-Catalogue/Course-Info/CourseLessons/Completed';
// import Video from './Pages/Course-Catalogue/Course-Info/CourseLessons/Video';
// import Document from './Pages/Course-Catalogue/Course-Info/CourseLessons/Document';
// import Audio from './Pages/Course-Catalogue/Course-Info/CourseLessons/Audio';

function App() {
  // login authentification
  const [token, setToken] = useState();

  // if (window.localStorage.getItem('token') === null) {
  //   return (
  //     <>
  //       <Login setToken={setToken} />
  //     </>
  //   );
  // }
  // const user = {
  //   userId: 1,
  //   userFullName: 'John Doe',
  //   userType: 'Educator',
  //   userEmail: 'johndoe@gmail.com',
  //   userPassword: '******',
  //   userPhoneNum: '416-111-1111',
  //   userCountry: 'Canada',
  //   userProvince: 'Ontario',
  //   userCity: 'Toronto',
  //   userProfilePic: tempProfilePic,
  //   userGender: 'Male',
  // };

  // const author = {
  //   userId: 1,
  //   userFullName: 'Professor Smith',
  //   userType: 'Educator',
  //   userEmail: 'johndoe@gmail.com',
  //   userPassword: '******',
  //   userPhoneNum: '416-111-1111',
  //   userCountry: 'Canada',
  //   userProvince: 'Ontario',
  //   userCity: 'Toronto',
  //   userProfilePic: tempProfilePic,
  //   userGender: 'Male',
  //   userRating: '4.6/5',
  //   userBio:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in turpis et odio ullamcorper posuere. Aenean risus lectus, consequat eu gravida sed, congue et nisi. Etiam suscipit erat sit amet placerat lacinia.',
  // };

  // window.sessionStorage.setItem('author', JSON.stringify(author));
  // window.sessionStorage.setItem('user', JSON.stringify(user));

  //write me a way to display the navbar component only if the user has successfully logged in

  return (
    <BrowserRouter>
      {window.sessionStorage.getItem('token') != null ? <Navbar /> : null}

      <Routes>
        <Route path='/' element={<Login setToken={setToken} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/games' element={<Games />} />
        <Route path='/course-catalogue' element={<CourseCatalogue />} />
        <Route path='/contact' element={<Contact />} />
        {/* <Route path='/CourseInfo' element={<CourseInfo />} />
        <Route path='/AuthorInfo' element={<AuthorInfo />} /> */}
        <Route path='/Document' element={<Document />} />
        <Route path='/Video' element={<Video />} />'
        <Route path='/Audio' element={<Audio />} />'
        <Route path='/Completed' element={<Completed />} />'
        <Route path='/ProfileHome' element={<ProfileHome />} />'
        {/* <Route
          path='/LearnersNotifications'
          element={<LearnersProfileNotifications />}
        /> */}
        {/* <Route path='/Security' element={<PrivacySecurity />} />
        <Route path='/CourseSpecific' element={<CourseSpecific />} /> */}
        <Route path='/author/:name' element={<Author />} />
        <Route path='/Completed' element={<Confetti />} />'
        <Route path='/creator/:id' element={<Author />} />
        {/* Educator Routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
