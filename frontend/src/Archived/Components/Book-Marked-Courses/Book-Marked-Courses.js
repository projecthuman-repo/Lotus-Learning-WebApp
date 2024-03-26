import React from 'react';
import "./Book-Marked-Courses.css";
import tempImg from "../../Images/placeholderimage.PNG"



// Coded by T.J. Sherwood 

function BookMarkedCourses() {

    

    return (

        <div className="container">

            <div className="Book-Marked-Courses1">
        
                {/* Container for Border */}
                <div className="border-container">

                    <div className='imContainer'>
                        <img className="im" src={tempImg}/>
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