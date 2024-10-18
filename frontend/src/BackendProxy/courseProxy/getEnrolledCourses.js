import axios from "axios";

const BASE_URL = "http://localhost:5000/course";

const getEnrolledCourses = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-enrolled-courses`, {
      params: { userId }, 
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getEnrolledCourses;