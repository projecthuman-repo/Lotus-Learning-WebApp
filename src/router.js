import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignUpPage from "./Pages/Sign-Up-Page/SignUpPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
