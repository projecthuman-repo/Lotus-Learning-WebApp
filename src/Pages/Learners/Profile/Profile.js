import React, { useState } from 'react';
import SideDashboard from '../../../components/Side-Dashboard/SideDashboard';
import { FaUserAlt, FaBell } from 'react-icons/fa';
import { IoMdBookmarks, IoMdLock, IoMdHelpCircle } from 'react-icons/io';
import { GiCardAceClubs } from 'react-icons/gi';
import { ImBooks } from 'react-icons/im';
import ProfileHome from './Screens/Profile-Home/ProfileHome';
import ProfileMyCourse from './Screens/Profile-MyCourses/ProfileMyCourse';

const course = {
  title: 'Title of Course',
  name: 'Art History',
  progress: 45,
};

const Profile = () => {
  const [currentScreen, setCurrentScreen] = useState(
    <ProfileHome course={course} />
  );

  const sideDashboardOptions = [
    {
      icon: <FaUserAlt className='c-blue' size={20} />,
      title: 'Profile',
      component: <ProfileHome />,
    },
    {
      icon: <IoMdBookmarks className='c-blue' size={20} />,
      title: 'My Courses',
      component: <ProfileMyCourse />,
    },
    { icon: <GiCardAceClubs className='c-blue' size={20} />, title: 'Games' },
    { icon: <ImBooks className='c-blue' size={20} />, title: 'Library' },
    { icon: <FaBell className='c-blue' size={20} />, title: 'Notifications' },
    { icon: <FaUserAlt className='c-blue' size={20} />, title: 'Account' },
    {
      icon: <IoMdLock className='c-blue' size={20} />,
      title: 'Privacy & Security',
    },
    { icon: <IoMdHelpCircle className='c-blue' size={20} />, title: 'Help' },
  ];

  //   const handleSideDashboardClick = (index) => {
  //     switch (index) {
  //       case 0:
  //         setCurrentScreen;
  //         break;

  //       default:
  //         break;
  //     }
  //   };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-3 border bor-lightGray p-5'>
          <SideDashboard
            sideDashboardOptions={sideDashboardOptions}
            setCurrentScreen={setCurrentScreen}
          />
        </div>
        <div className='col-9 px-5'>{currentScreen}</div>
      </div>
    </div>
  );
};

export default Profile;
