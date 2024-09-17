import axios from "axios";

const BASE_URL = " http://localhost:5000/user";

const checkInvitationCode = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/check-invitation-code`, {code: id});
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default checkInvitationCode;
