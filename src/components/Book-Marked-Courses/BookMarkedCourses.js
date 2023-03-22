import React from 'react';
import "./BookMarkedCourses.css";




// Coded by T.J. Sherwood 

function BookMarkedCourses() {

    

    return (

        <div className="container">

            <div className="Book-Marked-Courses1">
        
                {/* Container for Border */}
                <div className="border-container">

                    {/* Image Container */}
                    <div className="image-container">

                        <svg width="283" height="201" viewBox="0 0 283 201" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 18C1 8.05887 9.05888 0 19 0H264C273.941 0 282 8.05888 282 18V201H1V18Z" fill="#F4F2F2"/>
                            <line y1="-0.5" x2="338.397" y2="-0.5" transform="matrix(0.81493 -0.57956 0.557105 0.830442 1 201)" stroke="#B3B3B3"/>
                            <line y1="-0.5" x2="338.326" y2="-0.5" transform="matrix(0.819355 0.573287 -0.550847 0.834606 4.78906 6.83008)" stroke="#B3B3B3"/>
                            <path d="M102.52 110V93.2H104.92V110H102.52ZM109.95 110V93.2H111.918L119.454 105.896H118.398L125.838 93.2H127.806L127.83 110H125.526L125.502 96.824H126.054L119.43 107.96H118.326L111.654 96.824H112.254V110H109.95ZM130.328 110L137.936 93.2H140.312L147.944 110H145.424L138.632 94.544H139.592L132.8 110H130.328ZM133.568 105.8L134.216 103.88H143.672L144.368 105.8H133.568ZM157.799 110.192C156.503 110.192 155.311 109.984 154.223 109.568C153.135 109.136 152.191 108.536 151.391 107.768C150.591 106.984 149.967 106.072 149.519 105.032C149.071 103.992 148.847 102.848 148.847 101.6C148.847 100.352 149.071 99.208 149.519 98.168C149.967 97.128 150.591 96.224 151.391 95.456C152.207 94.672 153.159 94.072 154.247 93.656C155.335 93.224 156.535 93.008 157.847 93.008C159.175 93.008 160.391 93.224 161.495 93.656C162.599 94.088 163.535 94.736 164.303 95.6L162.815 97.088C162.127 96.416 161.375 95.928 160.559 95.624C159.759 95.304 158.887 95.144 157.943 95.144C156.983 95.144 156.087 95.304 155.255 95.624C154.439 95.944 153.727 96.392 153.119 96.968C152.527 97.544 152.063 98.232 151.727 99.032C151.407 99.816 151.247 100.672 151.247 101.6C151.247 102.512 151.407 103.368 151.727 104.168C152.063 104.952 152.527 105.64 153.119 106.232C153.727 106.808 154.439 107.256 155.255 107.576C156.071 107.896 156.959 108.056 157.919 108.056C158.815 108.056 159.671 107.92 160.487 107.648C161.319 107.36 162.087 106.888 162.791 106.232L164.159 108.056C163.327 108.76 162.351 109.296 161.231 109.664C160.127 110.016 158.983 110.192 157.799 110.192ZM161.855 107.744V101.504H164.159V108.056L161.855 107.744ZM170.938 100.448H179.578V102.488H170.938V100.448ZM171.154 107.912H180.946V110H168.754V93.2H180.61V95.288H171.154V107.912Z" fill="#C2C2C2"/>
                        </svg>

                    </div>

                    {/* Course Info Container */}
                    <div className="course-info-container">
                    
                        {/* Title of Course */}
                        <div className="title-container">
                            <a href="#">
                                <h1>Title of Course</h1>
                            </a>
                        </div>

                        {/* Author of Course */}
                        <div className="author-container">
                            <a href="#">
                                <h2>Author Name</h2>
                            </a>
                        </div>

                        {/* Description of Course */}
                        <div className="description-container">
                            <p>Description of the game written here...</p>
                        </div>

                        {/* Age Container */}
                        <div className="age-container">
                            <button class="age-button">
                                <p>Age</p>
                                <button class="x-button">x</button>
                            </button>
                        </div>

                        {/* Subject Container */}
                        <div className="subject-container">
                            <button class="subject-button">
                                <p>Subject</p>
                                <button class="x-button">x</button>
                            </button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    );
}

export default BookMarkedCourses;