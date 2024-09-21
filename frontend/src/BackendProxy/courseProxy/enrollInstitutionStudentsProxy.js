import axios from 'axios';
const BASE_URL = "http://lotuslearning.world/admin";

const enrollInstitutionStudentsProxy = async (institutionCode, courseId) => {
  try {
    const response = await axios.post(`${BASE_URL}/enroll-students`, {
      institutionCode,
      courseId
    });
    return response.data;
  } catch (error) {
    console.error('Error enrolling students:', error);
    return { success: false, message: error.message };
  }
};

export default enrollInstitutionStudentsProxy;
