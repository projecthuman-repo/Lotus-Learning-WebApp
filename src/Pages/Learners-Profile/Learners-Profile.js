import { Container } from 'react-bootstrap';
// import CourseBox from "../../components/Course-Box/CourseBox"
// import Header from "../../components/Header-Components/Logged-In/Header-Logged-In"
import SearchBar from '../../Archived/Components/SearchBar-Components/SearchBar';
import './Learners-Profile.css';
export default function LearnersProfile() {
  // const courses = ['Art', 'Languages', 'Math', 'Science'];
  return (
    <>
      {/* <Container className="LearnersPro-Header" fluid>
                <Header />
            </Container> */}
      <Container className='LearnersPro-search' fluid>
        <SearchBar />
      </Container>
      <Container>{/* {courses.map(course => (<CourseBox />))} */}</Container>
    </>
  );
}
