import Container from "react-bootstrap/Container";
import "./Header-Logged-Out.css";
import Logo from "../../../Images/BLN_Logo.png";
export default function Header() {
  return (
    <>
      <Container className="logOuted-Header" fluid>
        <div className="Logo-Title">
          <div>
            <img className="Logo" src={Logo} alt="Logo" />
          </div>
          <div className="Title">Black Lily Nursery</div>
        </div>
        <div className="Links">
          <div><a href="/">COURSES</a></div>
          <div><a href="/">GAMES</a></div>
          <div><a href="/">CONTACT</a></div>
          <div><a href="/">LOG IN</a></div>
          <div><a href="/"><b>SIGN UP</b></a></div>
        </div>
      </Container>
    </>
  );
}
