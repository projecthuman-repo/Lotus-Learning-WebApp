import React, { useState } from 'react';
import SideDashboard from '../../../components/Side-Dashboard/SideDashboard';
import { FaUserAlt, FaBell } from 'react-icons/fa';
import { IoMdBookmarks, IoMdLock, IoMdHelpCircle } from 'react-icons/io';
import { GiCardAceClubs } from 'react-icons/gi';
import { ImBooks } from 'react-icons/im';
import ProfileHome from './Screens/Profile-Home/ProfileHome';
import ProfileMyCourse from './Screens/Profile-MyCourses/ProfileMyCourse';
import './profile.css';
import ProfileGames from './Screens/Profile-Games/ProfileGames';
import ProfileNotifications from './Screens/Profile-Notifications/ProfileNotifications';
import ProfileAccount from './Screens/Profile-Account/ProfileAccount';
import ProfilePrivacy from './Screens/Profile-Privacy/ProfilePrivacy';
import ProfileHelp from './Screens/Profile-Help/ProfileHelp';

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

const sideDashboardOptions = [
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
  { icon: <ImBooks className='c-blue' size={20} />, title: 'Library' },
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

const Profile = () => {
  const [currentScreen, setCurrentScreen] = useState(
    <ProfileHome courses={courses} />
  );

  return (
    <div className='container-fluid '>
      <div className='row'>
        <div className='col-3 border bor-lightGray py-5 px-md-3 px-lg-5'>
          <SideDashboard
            sideDashboardOptions={sideDashboardOptions}
            setCurrentScreen={setCurrentScreen}
          />
        </div>
        <div className='col-9 '>{currentScreen}</div>
      </div>
    </div>
  );
};

export default Profile;
