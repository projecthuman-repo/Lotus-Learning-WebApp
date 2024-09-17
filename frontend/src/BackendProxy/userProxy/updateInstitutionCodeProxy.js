import axios from "axios";

const BASE_URL = ' http://localhost:5000/user';

const updateInstitutionCodeProxy = async (_id, code) => {
    try {
        const data = { _id, code };
        const response = await axios.post(`${BASE_URL}/update-institution-code`, data);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error in updateInstitutionCodeProxy:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error updating institution code');
    }
}

export default updateInstitutionCodeProxy;
