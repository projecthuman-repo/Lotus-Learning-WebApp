import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from '../../../frontend/src/Pages/newPages/registration/Login';

const userAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the user data from the server when the app starts
    axios.get('/get-user-cookies')
      .then(response => {
        setUser(response.data.userData);
      });
  }, []);

  if (user) {
    // If a user is logged in, show the logged-in screen
    return <HomePageLoggedIn user={user} />;
  } else {
    // If no user is logged in, show the login screen
    return <Login />;
  }
}

export default userAuth;