import axios from "axios";

const BASE_URL = " http://lotuslearning.world/course";

const getCoursesByProp = async (prop, value, code) => {
  try {
    const response = await axios.post(`${BASE_URL}/get-courses-by-prop`, { prop,  value, code});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default getCoursesByProp;
