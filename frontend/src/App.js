import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Games from "./Pages/Learners/Games/Games";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./Pages/Profile/Profile";
import Contact from "./Pages/Learners/Contact/Contact";

import CourseCatalogue from "./Pages/Learners/Course-Catalogue/course-catalogue";

import Document from "./Pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Document";
import Video from "./Pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Video";
import Audio from "./Pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Audio";

import Author from "./Pages/Learners/Author/Author";

<<<<<<< HEAD
=======
import Notification from "./components/Firebase/Notification";

>>>>>>> e94af87 (Add firebase component and refactor a service worker)
import SignUp from "./Pages/SignUp/SignUp";

import Completed from "./Pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Completed";

import { AuthProvider } from "./context/auth-context";
import Login from "./Pages/Login/Login";
import { getLogedInCookies } from "./cookie-handler/cookieHandler";

import CourseEditing from "./Pages/Educators/ProfileScreens/CourseEditing/CourseEditing";
import CourseCreation from "./Pages/Educators/ProfileScreens/CourseCreation/CourseCreation";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slice/user/userSlice";
import ProtectedRoute from "./ProtectedRoute";

//STYLE
import "./App.css";
import CoursePage from "./Pages/Course/CoursePage/CoursePage";
import CourseSuscriptionPage from "./Pages/Course/CourseSuscriptionPage/CourseSuscriptionPage";
import CourseLearningPage from "./Pages/Course/CourseLearningPage/CourseLearningPage";

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
<<<<<<< HEAD
  //redux
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);

  const [loadingUser, setLoadingUser] = useState(true);

=======
>>>>>>> e94af87 (Add firebase component and refactor a service worker)
  // login authentification

  const setAuthUser = async () => {
    setLoadingUser(true);
    // finds user storaged into the cookies  as 'userDataAuth'
    const foundUser = await getLogedInCookies();

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
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />

<<<<<<< HEAD
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loading={loadingUser}
                isAuthenticated={authUser ? false : true}
                reRouteTo={"/profile"}
              >
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute
                loading={loadingUser}
                isAuthenticated={authUser ? false : true}
                reRouteTo={"/profile"}
              >
                <SignUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:screen?"
            element={
              <ProtectedRoute
                loading={loadingUser}
                isAuthenticated={authUser ? true : false}
                reRouteTo={"/"}
              >
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/courseEditing/createCourse/:screen?"
            element={
              <ProtectedRoute
                loading={loadingUser}
                isAuthenticated={authUser ? true : false}
                reRouteTo={"/"}
              >
                <CourseCreation />
              </ProtectedRoute>
            }
          />
          <Route path="/games" element={<Games />} />
          <Route path="/courses" element={<CourseCatalogue />} />
          <Route path="/course" element={<CoursePage />} />
          <Route
            path="/course/suscription"
            element={
              <ProtectedRoute
                loading={loadingUser}
                isAuthenticated={authUser ? true : false}
                reRouteTo={"/"}
              >
                <CourseSuscriptionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/learning"
            element={
              <ProtectedRoute
                loading={loadingUser}
                isAuthenticated={authUser ? true : false}
                reRouteTo={"/"}
              >
                <CourseLearningPage />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Document" element={<Document />} />
          <Route path="/Video" element={<Video />} />'
          <Route path="/Audio" element={<Audio />} />'
          <Route path="/author/:name" element={<Author />} />
          <Route path="/Completed" element={<Completed />} />'
          <Route path="/creator/:id" element={<Author />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
=======
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/games" element={<Games />} />
            <Route path="/courses" element={<CourseCatalogue />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Document" element={<Document />} />
            <Route path="/Video" element={<Video />} />'
            <Route path="/Audio" element={<Audio />} />'
            <Route path="/author/:name" element={<Author />} />
            <Route path="/Completed" element={<Completed />} />'
            <Route path="/creator/:id" element={<Author />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Notification />
    </>
>>>>>>> e94af87 (Add firebase component and refactor a service worker)
  );
}

export default App;
