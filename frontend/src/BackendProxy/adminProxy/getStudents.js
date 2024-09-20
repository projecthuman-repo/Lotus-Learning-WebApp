import axios from "axios";

const BASE_URL = " http://lotuslearning.world/admin";

const getStudents = async (code) => {
  try {
    const response = await axios.post(`${BASE_URL}/get-students`, {code});
      console.log(response.data.data)
    return response.data.data
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default getStudents;
