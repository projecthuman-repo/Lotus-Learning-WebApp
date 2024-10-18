import axios from 'axios';

const BASE_URL = 'http://localhost:5000/course';


const updateGrades = async (enrollmentId, lessonId, lessonTitle, grade) => {
  try {
    const response = await axios.post(`${BASE_URL}/update-lesson-grade`, {
      enrollmentId,
      lessonId,       
      lessonTitle,    
      grade          
    });

    if (response.data.success) {
      console.log('Grade updated successfully:', response.data);
      return response.data;
    } else {
      console.error('Failed to update grade:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('Error updating grade:', error);
    return null;
  }
};

export default updateGrades;
