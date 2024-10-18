import axios from 'axios';

const BASE_URL = 'http://localhost:5000/course';

// Function to update any field in an enrollment document
const updateEnrollment = async (enrollmentId, updates) => {
  try {
    const response = await axios.post(`${BASE_URL}/update-enrollment/${enrollmentId}`, updates);

    if (response.data.success) {
      console.log('Enrollment updated successfully:', response.data.enrollment);
    } else {
      console.error('Error updating enrollment:', response.data.message);
    }
  } catch (error) {
    console.error('Error making request:', error);
  }
};

export default updateEnrollment;