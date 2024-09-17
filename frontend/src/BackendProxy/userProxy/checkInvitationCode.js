import axios from "axios";

const BASE_URL = " https://52.14.4.146:5000/user";

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
