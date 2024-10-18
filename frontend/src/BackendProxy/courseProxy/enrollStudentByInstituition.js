import axios from 'axios';
const BASE_URL = "http://localhost:5000/course";

const enrollStudentByInstitution = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/enroll-student-by-institution`, {
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Error enrolling students:', error);
    return { success: false, message: error.message };
  }
};

export default enrollStudentByInstitution;
