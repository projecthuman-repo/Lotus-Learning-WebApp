import axios from "axios";

const BASE_URL = ' http://localhost:5000/user';

const updateEmailProxy = async(_id, email) => {
    try {
        const data = { _id, email }; 
        const response = await axios.post(`${BASE_URL}/update-email`, data); 
        console.log(response); 
        return response;
    } catch (error) {
        console.error("Error in updateEmailProxy:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error updating email'); 
    }
}

export default updateEmailProxy;
