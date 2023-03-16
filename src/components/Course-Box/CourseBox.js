import { Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CourseBox.css";

const subjects = ["arts", "languages", "math", "science"];
// Developed by Joseph Choi

const CourseBox = () => {

  let subject = "art";

  return (
    <Container>
      <Row>
        <Col>
          <Button
            component="span"
            sx={{
              position: "absolute",
              width: 217,
              height: 208,
              p: 6,
              border: "2px solid #757575",
              borderRadius: 5,
            }}
          >
            {subjects[0]}
          </Button>
        </Col>
        <Col>
          <Button
            component="span"
            sx={{
              position: "absolute",
              width: 217,
              height: 208,
              p: 6,
              border: "2px solid #757575",
              borderRadius: 5,
            }}
          >
            {subjects[1]}
          </Button>
        </Col>
        <Col>
          <Button
            component="span"
            sx={{
              position: "absolute",
              width: 217,
              height: 208,
              p: 6,
              border: "2px solid #757575",
              borderRadius: 5,
            }}
          >
            {subjects[2]}
          </Button>
        </Col>
        <Col>
          <Button
            component="span"
            sx={{
              position: "absolute",
              width: 217,
              height: 208,
              p: 6,
              border: "2px solid #757575",
              borderRadius: 5,
            }}
          >
            {subjects[3]}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseBox;