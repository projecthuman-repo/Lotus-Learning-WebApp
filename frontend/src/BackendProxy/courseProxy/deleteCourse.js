import axios from "axios";

const BASE_URL = " http://52.14.4.146:5000/course";

const deleteCourseById = async (courseId) => {
  try {
    console.log("Course")
    const response = await axios.post(`${BASE_URL}/delete-course-by-id`, {
      courseId, 
    });
    return response.data; 
  } catch (error) {
    console.error("Error deleting course: ", error);
    throw error; 
  }
};

export default deleteCourseById;