import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Games from './pages/Learners/Games/Games';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile/Profile';
import Contact from './pages/Learners/Contact/Contact';

import CourseCatalogue from './pages/Learners/Course-Catalogue/course-catalogue';

import Document from './pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Document';
import Video from './pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Video';
import Audio from './pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Audio';

import Author from './pages/Learners/Author/Author';

import SignUp from './pages/SignUp/SignUp';

import Completed from './pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Completed';

import { AuthProvider } from './context/auth-context';
import Login from './pages/Login/Login';

function App() {
  // login authentification

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/games' element={<Games />} />
          <Route path='/courses' element={<CourseCatalogue />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/Document' element={<Document />} />
          <Route path='/Video' element={<Video />} />'
          <Route path='/Audio' element={<Audio />} />'
          <Route path='/author/:name' element={<Author />} />
          <Route path='/Completed' element={<Completed />} />'
          <Route path='/creator/:id' element={<Author />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
