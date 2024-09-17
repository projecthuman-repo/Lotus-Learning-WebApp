import axios from "axios";

const BASE_URL = ' http://localhost:5000/user';

const updateUsernameProxy = async(_id, username) => {
    try {
        const data = { _id, username }; 
        const response = await axios.post(`${BASE_URL}/update-username`, data); 
        console.log(response); 
        return response;
    } catch (error) {
        console.error("Error in updateUsernameProxy:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error updating username'); 
    }
}

export default updateUsernameProxy;
