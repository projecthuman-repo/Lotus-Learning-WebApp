import Container from "react-bootstrap/Container";
import "./Header.css";
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
          <div>COURSES</div>
          <div>GAMES</div>
          <div>CONTACT</div>
          <div>LOG IN</div>
          <div><b>SIGN UP</b></div>
        </div>
      </Container>
    </>
  );
}
