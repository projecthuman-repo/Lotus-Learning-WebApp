import React, { useEffect, useState } from "react";
import GeneralCourseCard from "../../../../components/course-cards/GeneralCourseCard";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import getCoursesByProp from "../../../../BackendProxy/courseProxy/getCoursesByProp";
import { useSelector } from "react-redux";
import getEnrolledCourses from "../../../../BackendProxy/courseProxy/getEnrolledCourses";

const StudentProfile = () => {
  const authUser = useSelector((state) => state.user);

  const [loaded, setLoaded] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [searchInput, setSearchInput] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
     // const res = await getCoursesByProp("accepted", true, authUser.institution.code);
      const res = await getEnrolledCourses(authUser._id); 
      console.log("The ID of the current user is " + authUser._id);
      console.log("Fetched Courses: ", res); 
      setEnrolledCourses(res.res); 
      setFilteredCourses(res.res); 
      setLoaded(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to load courses");
    }
  };


  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);

    const filtered = enrolledCourses.filter((course) =>
      course.title.toLowerCase().includes(value)
    );
    setFilteredCourses(filtered); 
  };

  return (
    <>
      <div className="bg-white rounded-full flex justify-between items-center py-2 px-4 mb-3">
        <p className="font-semibold text-lg">Your Courses</p>
        <div className="flex items-center space-x-3">
          <div className="cursor-pointer hover:bg-stone-100 p-2 rounded-full transition-all">
            <FaSortAlphaDownAlt className="text-stone-800" />
          </div>
          <div className="flex items-center">
            <input
              placeholder="Search by name"
              className="text-sm focus:outline-none focus:border-b-stone-400 border-b-transparent border-b-[1.5px] pr-2 py-1 font-medium text-stone-600"
              value={searchInput} // Bind the search input value
              onChange={handleSearchChange} // Trigger filtering on input change
            />
            <IoMdSearch />
          </div>
        </div>
      </div>

      <div className="max-h-[90vh] overflow-y-auto flex flex-wrap items-start">
        {loaded ? (
          filteredCourses.length > 0 ? (
            filteredCourses.map((course, i) => (
              <div key={i}>
                {course ? (
                  <GeneralCourseCard 
                    item={{
                      _id: course._id, 
                      title: course.title, 
                      creator: { username: course.creator.institutionName },
                      createdAt: course.createdAt 
                    }} userId={authUser._id} 
                  />
                ) : (
                  <p className="text-red-500">Course data missing</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No courses match your search.</p>
          )
        ) : (
          errorMessage ? (
            <p className="text-center text-red-500">{errorMessage}</p>
          ) : (
            <p className="text-center text-gray-500">Loading your courses...</p>
          )
        )}
      </div>
    </>
  );
};

export default StudentProfile;
