import "./App.css";
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

import SignUp from "./Pages/SignUp/SignUp";

import Completed from "./Pages/Learners/Course-Catalogue/Course-Info/CourseLessons/Completed";

import { AuthProvider } from "./context/auth-context";
import Login from "./Pages/Login/Login";

function App() {
	// login authentification

	return (
		<BrowserRouter>
			<AuthProvider>
				<Navbar />

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
	);
}

export default App;
