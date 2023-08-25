import React from 'react';
import styled from 'styled-components';
import GameBox from '../../../components/Game-Box/GameBox';
import NotificationInfo from '../../../components/Notification-Info/NotificationInfo';
import PasswordInfo from '../../../components/Password-Info/PasswordInfo';
import PersonalInfo from '../../../components/Personal-Information/PersonalInfo';
import PreferencesInfo from '../../../components/Preferences-Info/PreferencesInfo';
import LearnersInfo from '../../../components/Profile-Learners-Info/LearnersInfo';
import SideNav from '../../Components/Side-Nav-bar/Side-Nav';
import LearnersProfile from '../../../Pages/Learners-Profile/Learners-Profile';

import LearnersProfileTemplate from '../Learners-Profile-Template/Learners-Profile-Template.js';
import './LearnersAccount.css';

function LearnersAccount() {
  return (
    <div className='profileInfo'>
      <div className='LearnerInfoContainer'>
        <LearnersInfo></LearnersInfo>
      </div>
      <hr />
      <div className='personal-content'>
        <PersonalInfo></PersonalInfo>
        <hr />
        <PasswordInfo></PasswordInfo>
        <hr />
        <PreferencesInfo></PreferencesInfo>
        <hr />
        <NotificationInfo></NotificationInfo>
      </div>
    </div>
  );
}

function LearnersAccountPage() {
  return <LearnersProfileTemplate childComponent={LearnersAccount} />;
}

export default LearnersAccountPage;

const SplitRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const SplitCol = styled.div`
  display: flex;
  flex-direction: column;

  margin: 2rem;

  .personal-content {
    margin: 1rem 2.2rem 0 2.2rem;
  }
`;
