import React, { useEffect, useState } from 'react';
import SideDashboard from '../../components/Side-Dashboard/SideDashboard';
import { FaUserAlt, FaBell } from 'react-icons/fa';
import { IoMdBookmarks, IoMdLock, IoMdHelpCircle } from 'react-icons/io';
import { GiCardAceClubs } from 'react-icons/gi';
import { ImBooks } from 'react-icons/im';
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

//navigation login
import { setScreen } from './ProfileNavigation';

//redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slice/user/userSlice";
//PARAMS
import { useParams } from 'react-router-dom';
//STYLES
import './profile.css';

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
    route: undefined,
  },
  {
    icon: <IoMdBookmarks className='c-blue' size={20} />,
    title: 'My Courses',
    component: <ProfileMyCourse courses={courses} />,
    route: 'mycourses',

  },
  {
    icon: <GiCardAceClubs className='c-blue' size={20} />,
    title: 'Games',
    component: <ProfileGames courses={courses} />,
    route: 'games',
  },
  {
    icon: <ImBooks className='c-blue' size={20} />,
    title: 'Library',
    component: <ProfileLibrary courses={courses} />,
    route: 'library',

  },
  {
    icon: <FaBell className='c-blue' size={20} />,
    title: 'Notifications',
    component: <ProfileNotifications />,
    route: 'notifications',

  },
  {
    icon: <FaUserAlt className='c-blue' size={20} />,
    title: 'Account',
    component: <ProfileAccount />,
    route: 'account',

  },
  {
    icon: <IoMdLock className='c-blue' size={20} />,
    title: 'Privacy & Security',
    component: <ProfilePrivacy />,
    route: 'privacy&security',

  },
  {
    icon: <IoMdHelpCircle className='c-blue' size={20} />,
    title: 'Help',
    component: <ProfileHelp />,
    route: 'help',

  },
];

const educatorSideDashboardOptions = [
  {
    icon: <FaUserAlt className='c-blue' size={20} />,
    title: 'Profile',
    component: <EducatorProfileHome courses={courses} />,
    route: undefined,
  },
  {
    icon: <IoMdBookmarks className='c-blue' size={20} />,
    title: 'Course Editing',
    component: <CourseEditing courses={courses} />,
    route: 'courseEditing',
  },
  {
    icon: <GiCardAceClubs className='c-blue' size={20} />,
    title: 'Game Editing',
    component: <GameEditing courses={courses} />,
    route: 'gameEditing',

  },

  {
    icon: <FaUserAlt className='c-blue' size={20} />,
    title: 'Account',
    component: <EducatorAccount />,
    route: 'account',

  },
  {
    icon: <FaBell className='c-blue' size={20} />,
    title: 'Notifications',
    component: <ProfileNotifications />,
    route: 'notifications',
    
  },
  {
    icon: <IoMdLock className='c-blue' size={20} />,
    title: 'Privacy & Security',
    component: <ProfilePrivacy />,
    route: 'privacy&security',

  },
  {
    icon: <IoMdHelpCircle className='c-blue' size={20} />,
    title: 'Help',
    component: <ProfileHelp />,
    route: 'help',
  },
];

const Profile = (props) => {
  //params
  const { screen } = useParams();
  //redux
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user); 
  

  const [currentScreen, setCurrentScreen] = useState(
    <ProfileHome courses={courses} />
  );

  // console.log(window.sessionStorage.getItem('user'));
  const user = JSON.parse(window.sessionStorage.getItem('user'));

  useEffect(() =>{
    setCurrentScreen(setScreen(screen, authUser.accountType))

  },[screen])


  return (
    <div className='container relative'>
      <div className='row '>
          <SideDashboard
            sideDashboardOptions={
              // user.accountType === 'Learner' <=== old from window.sessionStorage.getItem('user')
              authUser.accountType === 'Learner'
              // true
                ? learnerSideDashboardOptions
                : educatorSideDashboardOptions
            }
            setCurrentScreen={setCurrentScreen}
          />
        <div className='md:w-[75%] w-full'>{currentScreen}</div>
      </div>
    </div>
  );
};

export default Profile;
