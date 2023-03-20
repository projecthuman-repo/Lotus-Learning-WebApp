import React from 'react'
import styled from 'styled-components'
import NotificationInfo from '../../components/Notification-Info/NotificationInfo'
import PasswordInfo from '../../components/Password-Info/PasswordInfo'
import PersonalInfo from '../../components/Personal-Information/PersonalInfo'
import PreferencesInfo from '../../components/Preferences-Info/PreferencesInfo'
import LearnersInfo from '../../components/Profile-Learners-Info/LearnersInfo'
import SideNav from '../../components/Side-Nav-bar/Side-Nav'
import LearnersProfile from '../Learners-Profile/Learners-Profile'

const LearnersAccount = () => {
    return (
        <SplitRow>
            <SideNav></SideNav>
            <SplitCol>
                <LearnersInfo></LearnersInfo>
                <hr />
                <div className="personal-content">
                    <PersonalInfo></PersonalInfo>
                    <hr />
                    <PasswordInfo></PasswordInfo>
                    <hr />
                    <PreferencesInfo></PreferencesInfo>
                    <hr />
                    <NotificationInfo></NotificationInfo>
                </div>
            </SplitCol>
        </SplitRow>

    )
}

export default LearnersAccount


const SplitRow = styled.div`
    display: flex;
    flex-direction: row;
    `

const SplitCol = styled.div`
    display: flex;
    flex-direction: column;

    margin: 2rem;

    .personal-content {
        margin: 1rem 2.2rem 0 2.2rem;
    }
`

