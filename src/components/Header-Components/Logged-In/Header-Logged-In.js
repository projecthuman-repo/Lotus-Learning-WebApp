import Container from "react-bootstrap/Container";
import "./Header-Logged-In.css";
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
          <div>
            <a href="/coursecatalogue">COURSES</a>
          </div>
          <div>
            <a href="/GameBox">GAMES</a>
          </div>
          <div>
            <a href="/">CONTACT</a>
          </div>
          <div>
            <div className="BellActive off-screen">
              <svg
                width="10"
                height="10"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7.5" cy="7.5" r="7.5" fill="#FF0707" />
              </svg>
            </div>
            <a href="/">
              <svg
                width="23"
                height="23"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M28.0251 26.25H18.6501C18.6501 27.2446 18.255 28.1984 17.5517 28.9016C16.8485 29.6049 15.8946 30 14.9001 30C13.9055 30 12.9517 29.6049 12.2484 28.9016C11.5452 28.1984 11.1501 27.2446 11.1501 26.25H1.77507C1.39053 26.24 1.01928 26.1072 0.715643 25.871C0.412004 25.6349 0.191912 25.3077 0.0875689 24.9375C-0.0230943 24.5757 -0.0289915 24.1899 0.0705605 23.8249C0.170112 23.4599 0.37104 23.1305 0.650069 22.875C1.57875 22.1738 2.33275 21.2674 2.85317 20.2265C3.37358 19.1857 3.64631 18.0387 3.65007 16.875V11.25C3.65007 8.26631 4.83533 5.40483 6.94512 3.29505C9.0549 1.18526 11.9164 0 14.9001 0C17.8838 0 20.7452 1.18526 22.855 3.29505C24.9648 5.40483 26.1501 8.26631 26.1501 11.25V16.875C26.1538 18.0387 26.4266 19.1857 26.947 20.2265C27.4674 21.2674 28.2214 22.1738 29.1501 22.875C29.4551 23.111 29.675 23.44 29.7765 23.8121C29.878 24.1842 29.8555 24.5793 29.7126 24.9375C29.6082 25.3077 29.3881 25.6349 29.0845 25.871C28.7809 26.1072 28.4096 26.24 28.0251 26.25Z"
                  fill="black"
                />
              </svg>
            </a>
          </div>
          <div>
            <a href="/CourseProgressPage2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6667 28.6667C12.5 28.6667 8.81667 26.5333 6.66667 23.3333C6.71667 20 13.3333 18.1667 16.6667 18.1667C20 18.1667 26.6167 20 26.6667 23.3333C24.5167 26.5333 20.8333 28.6667 16.6667 28.6667ZM16.6667 5C17.9927 5 19.2645 5.52678 20.2022 6.46447C21.1399 7.40215 21.6667 8.67392 21.6667 10C21.6667 11.3261 21.1399 12.5979 20.2022 13.5355C19.2645 14.4732 17.9927 15 16.6667 15C15.3406 15 14.0688 14.4732 13.1311 13.5355C12.1934 12.5979 11.6667 11.3261 11.6667 10C11.6667 8.67392 12.1934 7.40215 13.1311 6.46447C14.0688 5.52678 15.3406 5 16.6667 5ZM16.6667 0C14.478 0 12.3107 0.431096 10.2886 1.26867C8.26652 2.10625 6.4292 3.33391 4.88155 4.88155C1.75595 8.00716 0 12.2464 0 16.6667C0 21.0869 1.75595 25.3262 4.88155 28.4518C6.4292 29.9994 8.26652 31.2271 10.2886 32.0647C12.3107 32.9022 14.478 33.3333 16.6667 33.3333C21.0869 33.3333 25.3262 31.5774 28.4518 28.4518C31.5774 25.3262 33.3333 21.0869 33.3333 16.6667C33.3333 7.45 25.8333 0 16.6667 0Z"
                  fill="black"
                />
              </svg>
            </a>
          </div>
          <div>
            <a href="/signup">LOGOUT</a>
          </div>
        </div>
      </Container>
    </>
  );
}
