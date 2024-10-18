import axios from 'axios';

const BASE_URL = ' http://localhost:5000/course'

const createNewCourseProxy = async(newCourseObj) => {
      try {
        const response = await axios.post(`${BASE_URL}/create-new-course`, newCourseObj);
        console.log(response)
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || 'Error creating new course');
      }
    }
export default createNewCourseProxy;