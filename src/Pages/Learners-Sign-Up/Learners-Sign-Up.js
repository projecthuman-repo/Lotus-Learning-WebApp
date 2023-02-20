import { Container } from "react-bootstrap";
import LearnersSignUpForm from "../../components/Sign-Up-Form/Sign-Up-Form";
import "./Learners-Sign-Up.css";

// Coded by Joseph Choi

export default function LearnersSignUp() {
  return (
    <>
      <Container className="create">
        <LearnersSignUpForm />
      </Container>
    </>
  );
}
