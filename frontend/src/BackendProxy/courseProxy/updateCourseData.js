import axios from 'axios';
import compressJson from '../CompressJson.js';

const BASE_URL = ' http://localhost:5000/course'

const updateCourseDataProxy = async(course) => {
    try {
      const compressedCourse = await compressJson(course);

      const response = await axios.post(`${BASE_URL}/update-course`, {data: compressedCourse});
      // console.log(a);
      console.log(response)
      return response
    } catch (error) {
      throw new Error(error.response.data.message || 'Error creating new course');
    }
  }
export default updateCourseDataProxy;