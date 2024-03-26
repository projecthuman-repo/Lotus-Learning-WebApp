import LearnersProfileTemplate from '../Learners-Profile-Template/Learners-Profile-Template';
import BookMarkedCourses from '../../../components/Book-Marked-Courses/BookMarkedCourses';

import './LearnersLibrary.css';

let subjects = ['Math', 'Science', 'Coding', 'Art', 'Languages'];

let placeHolderArr = [1, 2, 3, 4, 5, 6];

function myComp() {
  return (
    <div className='myContainer'>
      {/* Title */}
      <div className='pageTitle'>
        <h1>Library</h1>
      </div>

      {/* Courses */}
      <div className='courseTitle'>
        <h2>Courses</h2>
      </div>

      {/* Line */}
      <hr className='lines'></hr>

      {/* Subjects */}
      <div className='buttonFrame'>
        {/* Maps subjects to buttons */}
        {subjects.map(function (sub) {
          return <button className='subName'>{sub}</button>;
        })}
      </div>

      {/* Completed Courses */}
      {/* Book Marked Component */}
      <div className='BookMarkedCoursesContainer'>
        <div className='BookMarkedCourseItems'>
          {placeHolderArr.map((item) => (
            <div className='BookMarkedCourseComponent'>
              <div className='cover'>
                <div className='circle'>
                  <svg
                    width='87'
                    height='87'
                    viewBox='0 0 87 87'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M43.297 5.00008C35.7256 4.99474 28.3227 7.2354 22.0251 11.4386C15.7274 15.6417 10.8181 21.6184 7.91822 28.6125C5.01834 35.6066 4.25825 43.3037 5.73412 50.7299C7.21 58.1561 10.8555 64.9777 16.2094 70.3314C21.5633 75.6851 28.3849 79.3305 35.8111 80.8062C43.2374 82.2818 50.9345 81.5215 57.9285 78.6215C64.9225 75.7214 70.8991 70.8119 75.1021 64.5142C79.3051 58.2164 81.5456 50.8135 81.54 43.2421C81.55 38.2172 80.5677 33.2397 78.6493 28.5954C76.731 23.9511 73.9144 19.7313 70.3612 16.1782C66.808 12.6251 62.5881 9.80862 57.9437 7.89039C53.2994 5.97216 48.3219 4.98993 43.297 5.00008Z'
                      stroke='white'
                      stroke-width='9'
                    />
                  </svg>
                </div>

                <h3>100% Completed</h3>
                <button className='coverButton'>Review Lesson</button>
                <div className='arrow'>
                  <svg
                    width='13'
                    height='13'
                    viewBox='0 0 13 13'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6.16 0L5.04 1.12L9.28 5.36H0V6.96H9.279L5.04 11.2L6.16 12.32L12.32 6.16L6.16 0Z'
                      fill='white'
                    />
                  </svg>
                </div>
              </div>
              <BookMarkedCourses />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProfileMyCourses() {
  return <LearnersProfileTemplate childComponent={myComp} />;
}
