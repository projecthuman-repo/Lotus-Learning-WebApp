import { Box, Button } from "@mui/material";
import "./CourseBox.css";

const CourseBox = () => {
  return (
    <span className="box">
      <Box component="span" sx={{ position: "absolute", width: 217, height: , p: 6, border: "2px solid #757575", borderRadius: 5, }}>
        <Button style={{ color: "black" }}>
          Subject
        </Button>
      </Box>
    </span>
  );
};

export default CourseBox;
