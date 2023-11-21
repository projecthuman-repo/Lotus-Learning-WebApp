import React, { useState } from 'react';
import SideDashboard from '../../components/Side-Dashboard/SideDashboard';
import { FaUserAlt, FaBell } from 'react-icons/fa';
import { IoMdBookmarks, IoMdLock, IoMdHelpCircle } from 'react-icons/io';
import { GiCardAceClubs } from 'react-icons/gi';
import { ImBooks } from 'react-icons/im';
import './profile.css';
import ProfileHome from '../Learners/ProfileScreens/Profile-Home/ProfileHome';
import ProfileMyCourse from '../Learners/ProfileScreens/Profile-MyCourses/ProfileMyCourse';
import ProfileGames from '../Learners/ProfileScreens/Profile-Games/ProfileGames';
import ProfileLibrary from '../Learners/ProfileScreens/Profile-Library/ProfileLibrary';
import ProfileNotifications from '../Learners/ProfileScreens/Profile-Notifications/ProfileNotifications';
import ProfileAccount from '../Learners/ProfileScreens/Profile-Account/ProfileAccount';
import ProfilePrivacy from '../Learners/ProfileScreens/Profile-Privacy/ProfilePrivacy';
import ProfileHelp from '../Learners/ProfileScreens/Profile-Help/ProfileHelp';
import CourseEditing from '../Educators/ProfileScreens/CourseEditing/CourseEditing';
import EducatorProfileHome from '../Educators/ProfileScreens/EducatorProfileHome/EducatorProfileHome';
import GameEditing from '../Educators/ProfileScreens/GameEditing/GameEditing';
import EducatorAccount from '../Educators/ProfileScreens/EducatorAccount/EducatorAccount';

const courses = [
  {
    title: 'Title of Course',
    name: 'Art History',
    progress: 95,
    creator: 'Name of Creator',
    description: 'Description of the game',
    tags: ['Math', 'Strategy', 'Puzzle'],
  },
  {
    title: 'Title of Course',
    name: 'Art History',
    progress: 65,
    creator: 'Name of Creator',
    description: 'Description of the game',
    tags: ['Math', 'Strategy', 'Puzzle'],
  },
  {
    title: 'Title of Course',
    name: 'Art History',
    progress: 20,
    creator: 'Name of Creator',
    description: 'Description of the game',
    tags: ['Math', 'Strategy', 'Puzzle'],
  },
];

const learnerSideDashboardOptions = [
  {
    icon: <FaUserAlt className='c-blue' size={20} />,
    title: 'Profile',
    component: <ProfileHome courses={courses} />,
  },
  {
    icon: <IoMdBookmarks className='c-blue' size={20} />,
    title: 'My Courses',
    component: <ProfileMyCourse courses={courses} />,
  },
  {
    icon: <GiCardAceClubs className='c-blue' size={20} />,
    title: 'Games',
    component: <ProfileGames courses={courses} />,
  },
  {
    icon: <ImBooks className='c-blue' size={20} />,
    title: 'Library',
    component: <ProfileLibrary courses={courses} />,
  },
  {
    icon: <FaBell className='c-blue' size={20} />,
    title: 'Notifications',
    component: <ProfileNotifications />,
  },
  {
    icon: <FaUserAlt className='c-blue' size={20} />,
    title: 'Account',
    component: <ProfileAccount />,
  },
  {
    icon: <IoMdLock className='c-blue' size={20} />,
    title: 'Privacy & Security',
    component: <ProfilePrivacy />,
  },
  {
    icon: <IoMdHelpCircle className='c-blue' size={20} />,
    title: 'Help',
    component: <ProfileHelp />,
  },
];

const educatorSideDashboardOptions = [
  {
    icon: <FaUserAlt className='c-blue' size={20} />,
    title: 'Profile',
    component: <EducatorProfileHome courses={courses} />,
  },
  {
    icon: <IoMdBookmarks className='c-blue' size={20} />,
    title: 'Course Editing',
    component: <CourseEditing courses={courses} />,
  },
  {
    icon: <GiCardAceClubs className='c-blue' size={20} />,
    title: 'Game Editing',
    component: <GameEditing courses={courses} />,
  },

  {
    icon: <FaUserAlt className='c-blue' size={20} />,
    title: 'Account',
    component: <EducatorAccount />,
  },
  {
    icon: <FaBell className='c-blue' size={20} />,
    title: 'Notifications',
    component: <ProfileNotifications />,
  },
  {
    icon: <IoMdLock className='c-blue' size={20} />,
    title: 'Privacy & Security',
    component: <ProfilePrivacy />,
  },
  {
    icon: <IoMdHelpCircle className='c-blue' size={20} />,
    title: 'Help',
    component: <ProfileHelp />,
  },
];

const Profile = () => {
  const [currentScreen, setCurrentScreen] = useState(
    <ProfileHome courses={courses} />
  );

  // console.log(window.sessionStorage.getItem('user'));
  const user = JSON.parse(window.sessionStorage.getItem('user'));

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3 border-end bor-lightGray py-5 px-md-3 px-lg-5'>
          <SideDashboard
            sideDashboardOptions={
              user?.accountType === 'Learner'
                ? learnerSideDashboardOptions
                : educatorSideDashboardOptions
            }
            setCurrentScreen={setCurrentScreen}
          />
        </div>
        <div className='col-9'>{currentScreen}</div>
      </div>
    </div>
  );
};

export default Profile;
