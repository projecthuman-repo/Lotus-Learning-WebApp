import axios from "axios";

const BASE_URL = " https://52.14.4.146:5000/course";

const getEnrolledCourses = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/get-enrolled-courses`, { userId });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getEnrolledCourses;
