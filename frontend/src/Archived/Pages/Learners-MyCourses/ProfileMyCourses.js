import LearnersProfileTemplate from '../../../Pages/Learners-Profile-Template/Learners-Profile-Template';
import BookMarkedCourses from '../../../components/Book-Marked-Courses/BookMarkedCourses';

import './ProfileMyCourses.css';

let placeHolderArr = [1, 2, 3];

// Putting CourseProg in its own component
function CourseInProg() {
  return (
    <div className='CourseInProgressContainer'>
      {/* Title of Course */}
      <div className='courseName'>
        <h1>Title of Course</h1>
      </div>

      {/* Subject of Course */}
      <div className='Subject-container'>
        <h2>Subject Name</h2>
      </div>

      {/* Course Percentage */}
      <div className='Course-percentage'>
        <svg
          width='90'
          height='90'
          viewBox='0 0 90 90'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M27.5615 49.4432V47.8452L33.2185 38.9091H34.4777V41.2614H33.6787L29.6325 47.6662V47.7685H37.3861V49.4432H27.5615ZM33.7682 52V48.9574L33.781 48.2287V38.9091H35.6539V52H33.7682ZM43.9347 52.179C43.1336 52.179 42.4134 52.0256 41.7742 51.7188C41.1393 51.4077 40.6322 50.9815 40.2529 50.4403C39.8737 49.8991 39.6713 49.2812 39.6457 48.5866H41.5633C41.6102 49.1491 41.8595 49.6115 42.3112 49.9737C42.7629 50.3359 43.3041 50.517 43.9347 50.517C44.4376 50.517 44.8829 50.402 45.2707 50.1719C45.6627 49.9375 45.9695 49.6158 46.1911 49.2067C46.417 48.7976 46.5299 48.331 46.5299 47.8068C46.5299 47.2741 46.4149 46.799 46.1847 46.3814C45.9546 45.9638 45.6372 45.6357 45.2323 45.397C44.8318 45.1584 44.3715 45.0369 43.8517 45.0327C43.4553 45.0327 43.0569 45.1009 42.6563 45.2372C42.2558 45.3736 41.9319 45.5526 41.6847 45.7741L39.8758 45.5057L40.6109 38.9091H47.8083V40.603H42.2536L41.8382 44.2656H41.9149C42.1705 44.0185 42.5093 43.8118 42.9312 43.6456C43.3573 43.4794 43.8133 43.3963 44.2991 43.3963C45.096 43.3963 45.8055 43.5859 46.4276 43.9652C47.0541 44.3445 47.5463 44.8622 47.9042 45.5185C48.2664 46.1705 48.4454 46.9205 48.4411 47.7685C48.4454 48.6165 48.2536 49.3729 47.8659 50.0376C47.4823 50.7024 46.9497 51.2266 46.2678 51.6101C45.5903 51.9893 44.8126 52.179 43.9347 52.179ZM57.6089 49.5455V48.8551C57.6089 48.3608 57.7112 47.9091 57.9157 47.5C58.1246 47.0866 58.4271 46.7564 58.8234 46.5092C59.224 46.2578 59.7077 46.1321 60.2744 46.1321C60.854 46.1321 61.3398 46.2557 61.7318 46.5028C62.1238 46.75 62.42 47.0803 62.6203 47.4936C62.8248 47.907 62.9271 48.3608 62.9271 48.8551V49.5455C62.9271 50.0398 62.8248 50.4936 62.6203 50.907C62.4157 51.3161 62.1153 51.6463 61.719 51.8977C61.327 52.1449 60.8454 52.2685 60.2744 52.2685C59.6991 52.2685 59.2133 52.1449 58.817 51.8977C58.4207 51.6463 58.1203 51.3161 57.9157 50.907C57.7112 50.4936 57.6089 50.0398 57.6089 49.5455ZM59.0983 48.8551V49.5455C59.0983 49.9119 59.1856 50.2443 59.3604 50.5426C59.5351 50.8409 59.8398 50.9901 60.2744 50.9901C60.7048 50.9901 61.0052 50.8409 61.1757 50.5426C61.3461 50.2443 61.4314 49.9119 61.4314 49.5455V48.8551C61.4314 48.4886 61.3483 48.1562 61.1821 47.858C61.0202 47.5597 60.7176 47.4105 60.2744 47.4105C59.8483 47.4105 59.5457 47.5597 59.3667 47.858C59.1878 48.1562 59.0983 48.4886 59.0983 48.8551ZM51.0251 42.054V41.3636C51.0251 40.8693 51.1274 40.4155 51.3319 40.0021C51.5407 39.5888 51.8433 39.2585 52.2396 39.0114C52.6402 38.7642 53.1238 38.6406 53.6906 38.6406C54.2702 38.6406 54.7559 38.7642 55.148 39.0114C55.54 39.2585 55.8362 39.5888 56.0365 40.0021C56.2368 40.4155 56.3369 40.8693 56.3369 41.3636V42.054C56.3369 42.5483 56.2346 43.0021 56.0301 43.4155C55.8298 43.8246 55.5315 44.1548 55.1352 44.4062C54.7432 44.6534 54.2616 44.777 53.6906 44.777C53.1111 44.777 52.6231 44.6534 52.2268 44.4062C51.8348 44.1548 51.5365 43.8246 51.3319 43.4155C51.1274 43.0021 51.0251 42.5483 51.0251 42.054ZM52.5209 41.3636V42.054C52.5209 42.4205 52.6061 42.7528 52.7765 43.0511C52.9513 43.3494 53.2559 43.4986 53.6906 43.4986C54.1167 43.4986 54.415 43.3494 54.5855 43.0511C54.7602 42.7528 54.8476 42.4205 54.8476 42.054V41.3636C54.8476 40.9972 54.7645 40.6648 54.5983 40.3665C54.4321 40.0682 54.1295 39.919 53.6906 39.919C53.2645 39.919 52.9619 40.0682 52.7829 40.3665C52.6082 40.6648 52.5209 40.9972 52.5209 41.3636ZM51.6324 52L60.6324 38.9091H62.1601L53.1601 52H51.6324Z'
            fill='black'
          />
          <circle cx='45' cy='45' r='38.5' stroke='white' stroke-width='13' />
          <mask
            id='mask0_1464_13238'
            mask-type='alpha'
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='90'
            height='90'
          >
            <circle
              cx='45'
              cy='45'
              r='38.5'
              stroke='#757575'
              stroke-width='13'
            />
          </mask>
          <g mask='url(#mask0_1464_13238)'>
            <rect
              x='-0.226562'
              y='-15.2305'
              width='58.0713'
              height='96.2709'
              transform='rotate(10.3612 -0.226562 -15.2305)'
              fill='#E7E7E7'
            />
          </g>
          <mask
            id='mask1_1464_13238'
            mask-type='alpha'
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='90'
            height='90'
          >
            <circle
              cx='45'
              cy='45'
              r='38.5'
              stroke='#757575'
              stroke-width='13'
            />
          </mask>
          <g mask='url(#mask1_1464_13238)'>
            <rect
              x='-0.226562'
              y='-15.2305'
              width='58.0713'
              height='96.2709'
              transform='rotate(10.3612 -0.226562 -15.2305)'
              fill='#E7E7E7'
            />
          </g>
        </svg>
      </div>

      {/* Continue Lesson */}
      <div className='Continue-button'>
        <button>CONTINUE LESSON</button>
        <svg
          width='16'
          height='10'
          viewBox='0 0 16 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1 5H15'
            stroke='black'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M11 9L15 5'
            stroke='black'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M11 1L15 5'
            stroke='black'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </div>
    </div>
  );
}

function myComp() {
  return (
    <div className='myContainer'>
      {/* Course Title  */}
      <div className='CoursesTitle'>
        <h1>Courses</h1>
      </div>

      <div className='inProgressContainer'>
        <h2>In Progress</h2>
      </div>
      <div className='CourseInProgressItems'>
        {placeHolderArr.map((item) => (
          <CourseInProg />
        ))}
      </div>

      <div className='loadButton'>
        <button className='loadMore'>Load more...</button>
      </div>
      {/* Book Marked Component */}
      <div className='BookMarkedCoursesContainer'>
        <h2>Book Marked Courses</h2>
        <div className='BookMarkedCourseItems'>
          {placeHolderArr.map((item) => (
            <div className='BookMarkedCourseComponent'>
              <BookMarkedCourses />
            </div>
          ))}
        </div>
        <div className='loadButton'>
          <button className='loadMore'>Load more...</button>
        </div>
      </div>
    </div>
  );
}

function MTest() {
  return (
    <div className='BookMarkedCourseComponent'>
      <BookMarkedCourses />
    </div>
  );
}

export default function ProfileMyCourses() {
  return <LearnersProfileTemplate childComponent={myComp} />;
}
