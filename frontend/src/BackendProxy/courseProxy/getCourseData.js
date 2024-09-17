import axios from "axios";

const BASE_URL = " http://localhost:5000/course";

const getCourseData = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-course-data`, {
      params: {
        id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default getCourseData;
