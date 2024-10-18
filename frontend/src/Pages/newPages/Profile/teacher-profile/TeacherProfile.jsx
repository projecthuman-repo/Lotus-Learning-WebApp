import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill, RiEdit2Fill } from 'react-icons/ri';
import OnHoverExtraHud from '../../../../components/OnHoverExtraHud';
import { IoMdSearch } from 'react-icons/io';
import { FaSortAlphaDownAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import getCoursesByProp from '../../../../BackendProxy/courseProxy/getCoursesByProp';
import SpinnerLoader from '../../../../components/loaders/SpinnerLoader';
import deleteCourseById from '../../../../BackendProxy/courseProxy/deleteCourse'; 
import { useNavigate, useParams } from "react-router-dom";

const TeacherProfile = () => {
  const navigate = useNavigate(); // Add navigate to enable routing
  const authUser = useSelector((state) => state.user);

  const [loaded, setLoaded] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [searchInput, setSearchInput] = useState(""); 

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCoursesByProp('creator.email', authUser.email, authUser.institution.code);
      setCourses(res.res);
      setFilteredCourses(res.res); 
      setLoaded(true);
      console.log(res.res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);

    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(value)
    );
    setFilteredCourses(filtered); 
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await deleteCourseById(courseId);
      if (response.success) {
        setCourses(courses.filter((course) => course._id !== courseId));
        setFilteredCourses(filteredCourses.filter((course) => course._id !== courseId)); // Update filtered courses after deletion
        console.log('Course deleted successfully');
      } else {
        console.error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-full flex justify-between items-center py-2 px-4">
        <p className="font-semibold text-lg">Your Courses</p>
        <div className="flex items-center space-x-3">
          <div className="cursor-pointer hover:bg-stone-100 p-2 rounded-full transition-all">
            <FaSortAlphaDownAlt className="text-stone-800" />
          </div>
          <div className="flex items-center">
            <input
              placeholder="Search by name"
              className="text-sm focus:outline-none focus:border-b-stone-400 border-b-transparent border-b-[1.5px] pr-2 py-1 font-medium text-stone-600"
              value={searchInput} // Bind search input value
              onChange={handleSearchChange} // Handle search input change
            />
            <IoMdSearch />
          </div>
        </div>
      </div>
      <div className="bg-white py-2 px-4 mt-3 rounded-lg">
        {!loaded ? (
          <SpinnerLoader />
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Students</th>
                <th>Ages</th>
                <th>State</th>
                <th className="text-end">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((item) => {
                  return <CourseCard key={item._id} item={item} handleDelete={handleDelete} navigate={navigate} />;
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500">
                    No courses match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

const CourseCard = ({ item, handleDelete, navigate }) => {
  return (
    <tr key={item._id} className="text-sm border-5 border-transparent">
      <td className="">{item.title}</td>
      <td>10</td>
      <td>{item.age} </td>
      <td>{item.accepted ? 'Approved' : 'Pending'}</td>
      <td className="flex space-x-2 items-center justify-end">
        <div
          className="p-2 hover:bg-blue-200 transition-all bg-blue-100 rounded-full cursor-pointer hover-parent"
          onClick={() => handleDelete(item._id)}
        >
          <RiDeleteBin7Fill className="text-md text-blue-700" />
          <OnHoverExtraHud name={'Delete'} />
        </div>
        <div
          className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent"
          onClick={() => navigate(`/course-editor/homePage/${item._id}`)}
        >
          <RiEdit2Fill className="text-md text-red-600" />
          <OnHoverExtraHud name={'Edit'} />
        </div>
      </td>
    </tr>
  );
};

export default TeacherProfile;
