import { Container } from 'react-bootstrap';
import ProfileButton from '../../../components/Profile-Button/Profile-Button';
import LearnersSignUpForm from '../../../components/Sign-Up-Form/Sign-Up-Form';
import './Learners-Sign-Up.css';

// Coded by Joseph Choi

export default function LearnersSignUp() {
  return (
    <>
      <Container className='create'>
        <ProfileButton />
        <LearnersSignUpForm />
      </Container>
    </>
  );
}
