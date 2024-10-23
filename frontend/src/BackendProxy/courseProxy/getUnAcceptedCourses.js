import axios from "axios";

const BASE_URL = " http://localhost:5001/course";

const getCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-courses-to-accept`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default getCourses;
