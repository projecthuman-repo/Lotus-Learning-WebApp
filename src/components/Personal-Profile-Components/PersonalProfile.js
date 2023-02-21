import React, { useState } from 'react';
import "./PersonalProfile.css";
import Header from "../../components/Header-Components/Logged-In/Header-Logged-In";

/* Coded by: T.J. Sherwood */ 



function PersonalProfile() {
    return (

        
       
        <div className="Personal-Profile-container">
        {/* Added Header to Reference */}
        <Header />
        
            {/* Container for Profile Picture */}
            <div className="profile-picture-container">

                {/* Big Profile Picture */}
                <div className="big-profile-picture">
                    <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="125" cy="125" r="125" fill="#D9D9D9"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M90.875 99.8125H95.8125C101.266 99.8125 105.688 95.3913 105.688 89.9375C105.688 87.2106 107.898 85 110.625 85H140.25C142.977 85 145.188 87.2106 145.188 89.9375C145.188 95.3913 149.609 99.8125 155.062 99.8125H160C165.454 99.8125 169.875 104.234 169.875 109.688V154.125C169.875 159.579 165.454 164 160 164H90.875C85.4212 164 81 159.579 81 154.125V109.688C81 104.234 85.4212 99.8125 90.875 99.8125" fill="#D9D9D9"/>
                            <path d="M90.875 99.8125H95.8125C101.266 99.8125 105.688 95.3913 105.688 89.9375C105.688 87.2106 107.898 85 110.625 85H140.25C142.977 85 145.188 87.2106 145.188 89.9375C145.188 95.3913 149.609 99.8125 155.062 99.8125H160C165.454 99.8125 169.875 104.234 169.875 109.688V154.125C169.875 159.579 165.454 164 160 164H90.875C85.4212 164 81 159.579 81 154.125V109.688C81 104.234 85.4212 99.8125 90.875 99.8125" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="125.438" cy="129.438" r="14.8125" fill="white" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>

                {/* Small profile Picture */}
                <div className="small-profile-picture">
                    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="29" cy="29" r="28.5" fill="#D9D9D9" stroke="#EAEAEA"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9109 24.2159H22.9522C24.1025 24.2159 25.0349 23.2834 25.0349 22.1332C25.0349 21.558 25.5012 21.0918 26.0763 21.0918H32.3245C32.8996 21.0918 33.3659 21.558 33.3659 22.1332C33.3659 23.2834 34.2983 24.2159 35.4486 24.2159H36.4899C37.6402 24.2159 38.5727 25.1484 38.5727 26.2986V35.6709C38.5727 36.8211 37.6402 37.7536 36.4899 37.7536H21.9109C20.7606 37.7536 19.8281 36.8211 19.8281 35.6709V26.2986C19.8281 25.1484 20.7606 24.2159 21.9109 24.2159Z" fill="#D9D9D9"/>
                        <path d="M21.9109 24.2159H22.9522C24.1025 24.2159 25.0349 23.2834 25.0349 22.1332C25.0349 21.558 25.5012 21.0918 26.0763 21.0918H32.3245C32.8996 21.0918 33.3659 21.558 33.3659 22.1332C33.3659 23.2834 34.2983 24.2159 35.4486 24.2159H36.4899C37.6402 24.2159 38.5727 25.1484 38.5727 26.2986V35.6709C38.5727 36.8211 37.6402 37.7536 36.4899 37.7536H21.9109C20.7606 37.7536 19.8281 36.8211 19.8281 35.6709V26.2986C19.8281 25.1484 20.7606 24.2159 21.9109 24.2159" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="29.2022" cy="30.4639" r="3.12409" fill="white" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>

            {/* Container for Name and Description */}
            <div className="Name-Description-container">
                <h1>John Doe</h1>
                <p>Student/Learner</p>

                <div className="description-box">
                    <textarea id="description" name="description" placeholder="Description Here."></textarea>
                </div>
            </div>

        </div>
        
    );
}

export default PersonalProfile;