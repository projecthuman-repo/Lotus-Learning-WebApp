import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./context/auth-context";
import { getLogedInCookies } from "./cookie-handler/cookieHandler";


//REDUX
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slice/user/userSlice";

//STYLE
import "./App.css";
import Registration from "./Pages/newPages/registration/Registration";
import Profile from "./Pages/newPages/Profile/Profile";
import HomePage from "./Pages/newPages/homePage/HomePage";
import CoursePage from "./Pages/newPages/coursePage/CoursePage";
import Learning from "./Pages/newPages/learningPage/Learning";
import NotFoundPage from "./Pages/newPages/notFoundPage/NotFoundPage";

// Debug For Firebase Messaging
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

function App() {
  //redux
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);

  const [loadingUser, setLoadingUser] = useState(true);

  // login authentification

  const setAuthUser = async () => {
    setLoadingUser(true);
    // finds user storaged into the cookies  as 'userDataAuth'
    const foundUser = await getLogedInCookies();
    console.log('user found', foundUser);
    if (foundUser) {
      // saves the found user into the redux for auth
      return new Promise((resolve) => {
        dispatch(setUser(foundUser.userData));
        resolve();
      });
    }
    return Promise.resolve();
  };

  useEffect(() => {
    setAuthUser()
      .then(() => {
        setLoadingUser(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoadingUser(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/course" element={<CoursePage/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/learning/:courseName?" element={<Learning/>}/>
          <Route path="/profile/:screen?/:secondscreen?" element={<Profile/>}/>
          <Route path="/" element={<HomePage/>}/>
          {/* NOT FOUND PAGE 404 */}
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>

      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
