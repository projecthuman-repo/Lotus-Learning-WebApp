import { Box, Button } from "@mui/material";
import "./CourseBox.css";

const CourseBox = () => {
  return (
    <div className="box">
      <Box component="span" sx={{ p: 2, border: "1px solid grey" }}>
        <Button style={{
            color: "black",
          }}
        >
          Subject
        </Button>
      </Box>
    </div>
  );
};

export default CourseBox;
