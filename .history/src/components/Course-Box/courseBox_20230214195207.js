import { Box, Button } from "@mui/material";
import "./CourseBox.css";

const CourseBox = () => {
  return (
    <span className="box">
      <Box component="span" sx={{ p: 6, border: "2px solid grey", borderRadius: }}>
        <Button style={{ color: "black" }}>
          Subject
        </Button>
      </Box>
    </span>
  );
};

export default CourseBox;
