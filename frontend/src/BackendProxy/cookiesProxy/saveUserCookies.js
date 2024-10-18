import axios from "axios";

const BASE_URL = " http://localhost:5000/cookies";

const saveUserOnCookies = async (user) => {
  try {
    const saveOnCookies = await axios.post(`${BASE_URL}/save-user`, {
        user
      },{
        withCredentials: true, // Include cookies in the request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (saveOnCookies.status === 200) {
        return saveOnCookies.data.data.user
      }
      else {
        throw new Error("Error saving on cookies")
      }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default saveUserOnCookies;
