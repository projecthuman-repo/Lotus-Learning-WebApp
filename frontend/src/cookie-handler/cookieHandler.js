import axios from 'axios';


const url = 'http://localhost:5000/cookies'


export const getLogedInCookies = async () => {
  try {
    const response = await axios.get(`${url}/get-user-cookies`, {
      withCredentials: true, // Include cookies in the request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('User Found 200');
    return response.data;
  } catch (error) {
    console.error('Error in the request:', error);
    return null;
  }
};

export const saveUserCookies = async(userData) => {
    axios.post(`${url}/save-user`, userData , {
      withCredentials: true, // Include cookies in the request
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Server response:', response.data);
        // Handle the server response here according to your needs
      })
      .catch((error) => console.error('Error in the request:', error));
};


export const deleteUserCookies = async(userData) => {
  axios.post(`${url}/delete-user-cookie`, userData , {
    withCredentials: true, // Include cookies in the request
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log('Server response:', response.data);
      // Handle the server response here according to your needs
    })
    .catch((error) => console.error('Error in the request:', error));
};

