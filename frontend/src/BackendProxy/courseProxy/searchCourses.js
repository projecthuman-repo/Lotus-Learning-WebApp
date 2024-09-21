import axios from "axios";

const BASE_URL = "http://lotuslearning.world/course";

export const searchCourses = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/search-courses`, {
      params: { title }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching courses:", error);
    throw error;
  }
};