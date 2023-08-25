import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./courseInfo.css"; // Import your custom CSS file

const CourseInfo = () => {
  // Temporary data for course cards (replace this with your actual data)
  const courseCards = [
    {
      title: "01. Introduction",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    },
    {
      title: "02. Lesson 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    },
    {
      title: "03. Lesson 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    },
  ];

  return (
    <div>
      {/* First Row */}
      <div className="bg-light-grey first-row">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md={6}>
              <img
                src="https://www.svgrepo.com/show/11140/picture.svg"
                alt="Game"
                className="img-fluid "
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="py-4">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="text-start pl-4">
                <h2>Title of Course</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Second Row */}
      <Container>
        <Row className="justify-content-center">
          {/* Progress Tracking Line */}
          <div className="progress-line"></div>

          <Col className="bg-light-gray" md={10}>
            {/* Course Cards */}
            {courseCards.map((course, index) => (
              <div
                key={index}
                className="course-card mb-3 p-2 rounded bg-light-gray"
              >
                <Row>
                  {/* Left Side (Image) */}
                  <Col md={3} className="course-image pl-0">
                    {/* Add your course image here (use appropriate CSS for sizing) */}
                    <img
                      src="https://www.svgrepo.com/show/11140/picture.svg"
                      className="img-fluid"
                    />
                  </Col>

                  {/* Right Side (Details) */}
                  <Col md={9} className="course-details">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    {/* Add more course details here as needed */}
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
        </Row>

        {/* Load More Button */}
        <Row className="justify-content-center mt-4">
          <Button variant="link" className="load-more-btn">
            Load More
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default CourseInfo;
