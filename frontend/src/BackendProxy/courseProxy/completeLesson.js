import axios from 'axios';

const BASE_URL = ' http://localhost:5000/course'
const completeLesson = async (courseId, lessonId) => {
  try {
    const res = await axios.post(`${BASE_URL}/complete-lesson`, { courseId, lessonId });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default completeLesson;