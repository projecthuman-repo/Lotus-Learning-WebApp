import LearnersProfileTemplate from '../../../Pages/Learners-Profile-Template/Learners-Profile-Template.js';
import './LearnersGamesPage.css';
import ProfileButton from '../../../components/Profile-Button/Profile-Button.js';
import WeekdayButtons from '../../../components/WeekdayButtons/WeekdayButtons.js';
import BookMarkedCourses from '../../../components/Book-Marked-Courses/Book-Marked-Courses.js';

let gameType = ['Puzzle', 'Cards', 'Educational', 'Strategy'];
let placeHolderArr = [1, 2, 3];

function LearnersGames() {
  return (
    <div className='container'>
      <h1>My Games List</h1>
      <div className='saved-header'>
        <h2>Saved</h2>
        <p className='sorters'>View by Name</p>
        <p className='seperator'>|</p>
        <p className='sorters'>View by Subject</p>
      </div>
      <hr></hr>
      <div className='buttonTest'>
        <WeekdayButtons prop={gameType} />
      </div>
      <div className='BookMarkedCourseItems'>
        {placeHolderArr.map((item) => (
          <div className='BookMarkedCourseComponent'>
            <BookMarkedCourses />
          </div>
        ))}
      </div>
      <div className='saved-header'>
        <h2>Saved</h2>
        <p className='sorters'>View by Name</p>
        <p className='seperator'>|</p>
        <p className='sorters'>View by Subject</p>
      </div>
      <hr></hr>
    </div>
  );
}

export default function LearnersGamesPage() {
  return <LearnersProfileTemplate childComponent={LearnersGames} />;
}
