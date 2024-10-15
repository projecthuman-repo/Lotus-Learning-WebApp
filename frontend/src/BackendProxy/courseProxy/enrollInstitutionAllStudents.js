import axios from 'axios';
const BASE_URL = " http://localhost:5000/admin";

const enrollInstitutionAllStudents = async (institutionCode, courseId) => {
  try {
    const response = await axios.post(`${BASE_URL}/enroll-all-students`, {
      institutionCode,
      courseId
    });
    return response.data;
  } catch (error) {
    console.error('Error enrolling students:', error);
    return { success: false, message: error.message };
  }
};

export default enrollInstitutionAllStudents;
