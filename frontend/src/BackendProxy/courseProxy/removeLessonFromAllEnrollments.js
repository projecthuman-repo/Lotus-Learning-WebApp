import axios from 'axios';
const BASE_URL = "http://localhost:5000/course";

const removeLessonFromAllEnrollments = async (courseId,lessonId) => {
  try {
    const response = await axios.post(`${BASE_URL}//remove-lesson-from-enrollments`, {
      courseId,
      lessonId
    });
    return response.data;
  } catch (error) {
    console.error('Error enrolling students:', error);
    return { success: false, message: error.message };
  }
};

export default removeLessonFromAllEnrollments;
