import { Box, Button } from "@mui/material";
import "./CourseBox.css";

const CourseBox = () => {
  return (
    <span className="box">
      <Box component="span" sx={{ p: 6, border: "1px solid grey",  }}>
        <Button style={{ color: "black" }}>
          Subject
        </Button>
      </Box>
    </span>
  );
};

export default CourseBox;
