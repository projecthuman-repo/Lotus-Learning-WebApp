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
import CreateNewCourse from "./Pages/newPages/createCoursePage/CreateNewCourse";
import HomePageLoggedIn from "./Pages/newPages/homePage/HomePageLoggedIn";
import User from "./Pages/newPages/user/User";
import AdminHomePage from "./Pages/newPages/adminPages/adminHomePage/AdminHomePage";
import AdminManageStudents from "./Pages/newPages/adminPages/adminStudentsManage/AdminManageStudents";
import AdminManageEducators from "./Pages/newPages/adminPages/adminEducatorsManage/AdminManageEducators";
import AdminManageCourses from "./Pages/newPages/adminPages/adminCoursesManage/AdminManageCourses";
import CreateEditCourse from "./components/profile-components/create-edit-new_course/CreateEditCourse";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./Pages/newPages/registration/ForgotPassword";
import VerifyOTP from "./Pages/newPages/registration/verifyotp";
import ChangePassword from "./components/profile-components/ChangePassword";
import ProfileReRoutes from "./Pages/newPages/Profile/ProfileReRoutes";
import TestPlayGround from "./TestPlayGround";
import AdminInvitationPage from "./Pages/newPages/adminPages/adminInvitationPage/AdminInvitationPage";
import CourseEditPage from "./Pages/Course/CourseEditPage/CourseEditPage";

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
  const [auth, setAuth] = useState(false)

  const [loadingUser, setLoadingUser] = useState(true);

  // login authentification

  const setAuthUser = async () => {
    setLoadingUser(true);
    // finds user storaged into the cookies  as 'userDataAuth'
    const foundUser = await getLogedInCookies();
    if (foundUser) {
      // saves the found user into the redux for auth
      return new Promise((resolve) => {
        dispatch(setUser(foundUser.userData.user));
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

  useEffect(() => {
    if(authUser){
      setAuth(true)
    }else{
      setAuth(false);
    }
  },[authUser])

  return (
    <BrowserRouter>
      {loadingUser ? 
        <div>Loading Pages...</div>
        :
        <AuthProvider>
          <Routes>
            <Route path="/test" element={<TestPlayGround/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/course" element={<CoursePage/>}/>
            <Route path="/learning/:courseName?" element={<Learning/>}/>

            <Route path="/profile/:screen?/:secondscreen?/:courseid?" element={
              <ProtectedRoute  isAuthenticated={(authUser)}>
                <Profile/>
              </ProtectedRoute>
            }/>
            <Route path="/user/:screen?" element={<User/>}/>
            <Route path="/logintest" element={<HomePageLoggedIn/>}/>
            <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
            <Route path="/verifyotp" element={<VerifyOTP/>}/>
            <Route path="/profile/profile-settings/changepassword" element={<ChangePassword/>}/>


            {/* Admin Pages */}
            <Route path="/admin/students" element={
              <ProtectedRoute  isAuthenticated={(authUser && authUser.accountType === 'admin')}>
                <AdminManageStudents/>
              </ProtectedRoute>
            }/>
            <Route path="/admin/educators/:screen?" element={
              <ProtectedRoute  isAuthenticated={(authUser && authUser.accountType === 'admin')}>
                <AdminManageEducators/>
              </ProtectedRoute>
            }/> 
            <Route path="/admin/courses/:screen?" element={
              <ProtectedRoute  isAuthenticated={(authUser && authUser.accountType === 'admin')}>
                <AdminManageCourses/>
              </ProtectedRoute>
            
            }/>
            <Route path="/admin" element={
              <ProtectedRoute isAuthenticated={(authUser && authUser.accountType === 'admin')}>
                <AdminHomePage/>
              </ProtectedRoute>
            }/>
            <Route path="/admin/invite/:type?" 
              element={
                <ProtectedRoute isAuthenticated={(authUser && authUser.accountType === 'admin')}>
                  <AdminInvitationPage/>
                </ProtectedRoute>
              }
            />

            {/* Course Creation and editing */}
            <Route path="/create-new-course/:step?" element={<CreateNewCourse/>}/>
            <Route path="/course-editor/:secondscreen?/:courseid?" element={<CreateEditCourse />}/>
            <Route path="/course-program/:courseid?" element={<CourseEditPage/>}/>


            <Route path="/" element={
              <ProtectedRoute  isAuthenticated={(authUser)}>
                <HomePage/>
               </ProtectedRoute> 
            }/>
            <Route path="/home" element={<HomePage/>}/>
            {/* NOT FOUND PAGE 404 */}
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </AuthProvider>
    }


    </BrowserRouter>

  );
}

export default App;
