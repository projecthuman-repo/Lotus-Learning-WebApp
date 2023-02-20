import "./Side-Nav.css";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function SideNav() {
  return (
    <>
      <Container className="SideNav" fluid>
        <Container fluid>
          <h4>Dashboard</h4>
        </Container>
        <Container className="SideNavLinks" fluid>
          <Button variant="secondary" size="lg">
            Block level button
          </Button>
          <Button variant="secondary" size="lg">
            Block level button
          </Button>
          <Button variant="secondary" size="lg">
            Block level button
          </Button>
          <Button variant="secondary" size="lg">
            Block level button
          </Button>
          <Button variant="secondary" size="lg">
            Block level button
          </Button>
          
        </Container>
      </Container>
    </>
  );
}
