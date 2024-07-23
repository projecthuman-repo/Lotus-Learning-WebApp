import React, { useState } from 'react';
import GeneralFooter from '../../components/footer/GeneralFooter';
import { searchCourses } from "../../BackendProxy/newPage/searchCourses";
import { useNavigate } from 'react-router-dom';
import Icon from "../../Images/LotusLogoW2.png";

const NewPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const data = await searchCourses(query);
      setResults(data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const GeneralNavbar = () => {
    return (
      <nav className="w-full bg-blue-500 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={Icon} alt="icon" className="h-10 mr-2" />
          <a href="/" className="text-white text-lg font-semibold">Lotus Learning</a>
        </div>
        <div className="space-x-4">
          <a href="/about" className="text-white">About Us</a>
          <a href="/contact" className="text-white">Contact Us</a>
          <a href="/faq" className="text-white">FAQ</a>
          <a href="/terms" className="text-white">Terms</a>
        </div>
      </nav>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <GeneralNavbar />
      <div className="flex-grow p-4">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses by title"
            className="w-full p-2 border rounded mb-2"
          />
          <button 
            onClick={handleSearch}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Search
          </button>
          
          {results.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Search Results</h2>
              <ul className="list-disc list-inside">
                {results.map((course) => (
                  <li 
                    key={course._id} 
                    className="cursor-pointer text-blue-600 hover:underline"
                    onClick={() => navigate('/course?id='+course._id)}
                  >
                    {course.title}
                  </li> 
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default NewPage;