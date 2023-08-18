import './CourseSpecific.css';
import Header from '../../../components/Header-Components/Logged-In/Header-Logged-In';
import { Container } from 'react-bootstrap';

export default function CourseSpecific() {
  return (
    <>
      <Container className='courseSpecific-Container' fluid>
        <div>{/* <Header /> */}</div>
        <Container className='courseSpecific-Content-Container' fluid>
          <Container className='courseSpecific-image-div' fluid>
            <p>Image</p>
          </Container>
          <Container fluid></Container>
        </Container>
      </Container>
    </>
  );
}
