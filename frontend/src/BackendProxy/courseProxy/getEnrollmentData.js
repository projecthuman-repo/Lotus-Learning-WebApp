import axios from 'axios';

const BASE_URL = "http://localhost:5000/course";

// Function to fetch enrollment data for a specific user and course
const getEnrollmentData = async (userId, courseId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-enrollment-by-userId-and-courseId`, {
      params: {
        userId,
        courseId,
      },
    });

    // Destructure the returned enrollment and course data
    const { enrollment, course } = response.data;

    return { enrollment, course }; // Return both enrollment and course separately
  } catch (error) {
    console.error('Failed to fetch enrollment data:', error);
    throw error;
  }
};

export default getEnrollmentData; 