import { Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CourseBox.css";

const subjects = ["arts", "languages", "math", "science"];
// Developed by Joseph Choi

const CourseBox = () => {
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

//Styling
{
  /* <Container className="box">
<Row>
  <Col>
    <Button
      component="span"
      sx={{
        position: "absolute",
        width: 217,
        height: 208,
        left: 188,
        top: 656,
        p: 6,
        border: "2px solid #757575",
        borderRadius: 5,
      }}
    >
      {subject}
    </Button>
  </Col>
  <Col>
    <Button
      component="span"
      sx={{
        position: "absolute",
        width: 217,
        height: 208,
        left: 188,
        top: 656,
        p: 6,
        border: "2px solid #757575",
        borderRadius: 5,
      }}
    >
      {subject}
    </Button>
  </Col>
</Row>
<Row>
  <Col>
    <Button
      component="span"
      sx={{
        position: "absolute",
        width: 217,
        height: 208,
        left: 188,
        top: 656,
        p: 6,
        border: "2px solid #757575",
        borderRadius: 5,
      }}
    >
      {subject}
    </Button>
  </Col>
</Row>
</Container> */
}

//Grid
{
  /* <Row>
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
    {subject}
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
    {subject}
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
    {subject}
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
    {subject}
  </Button>
</Col>
</Row> */
}

// JavaScript
{
  /* <h1>Course Catalogue</h1>
{subjects.map((subject, key) => {
  return (
    <Row>
      <Col key={key}>
        <Subject name={subject} />
      </Col>
    </Row>
  );
})} */
}

//function for array iteration
// const Subject = ({ name }) => {
//   return (
//     <Col>
//       <Button
//         component="span"
//         sx={{
//           position: "absolute",
//           width: 217,
//           height: 208,
//           p: 6,
//           border: "2px solid #757575",
//           borderRadius: 5,
//         }}
//       >
//         {name}
//       </Button>
//     </Col>
//   );
// };
