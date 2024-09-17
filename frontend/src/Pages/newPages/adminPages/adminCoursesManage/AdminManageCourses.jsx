import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import BlobComposition from "../../../../components/backgrounds/BlobComposition/BlobComposition";
import { IoMdSearch } from "react-icons/io";
import { FaRegEye, FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import OnHoverExtraHud from "../../../../components/OnHoverExtraHud";
import { IoIosAdd } from "react-icons/io";
import SpinnerLoader from "../../../../components/loaders/SpinnerLoader";
import { MdClose, MdDone } from "react-icons/md";
import getCoursesByProp from "../../../../BackendProxy/courseProxy/getCoursesByProp";
import AcceptRejectPetition from "../../../../components/accept-reject-classpetition/AcceptRejectPetition";
import { useSelector } from "react-redux";
import deleteCourseById from "../../../../BackendProxy/courseProxy/deleteCourse";

const AdminManageCourses = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user);

  const [loaded, setLoaded] = useState(false);
  const [loadedReq, setLoadedReq] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchInput, setSearchInput] = useState(""); 

  const getAllAcceptedCourses = async () => {
    try {
      const res = await getCoursesByProp("accepted", true, authUser.institution.code);
      setCourses(res.res);
      setFilteredCourses(res.res); 
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPendingRequests = async () => {
    try {
      const res = await getCoursesByProp("accepted", false, authUser.institution.code);
      setPendingRequests(res.res);
      setLoadedReq(true);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', ' -');
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await deleteCourseById(courseId);
      if (response.success) {
        setCourses(courses.filter((course) => course._id !== courseId));
        console.log('Course deleted successfully');
      } else {
        console.error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  useEffect(() => {
    getAllAcceptedCourses();
    getAllPendingRequests();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
  
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().startsWith(value)
    );
    setFilteredCourses(filtered);
  };

  return (
    <div>
      <GeneralNavbar />
      <BlobComposition
        blobsData={[
          { top: "10%", left: "-20%", size: "700px" },
          { top: "-30%", left: "70%", size: "400px" },
          { top: "40%", left: "50%", size: "300px" },
        ]}
      />
      <div className="m-auto max-w-[1200px] mt-3 min-h-[100vh]">
        {pendingRequests.length > 0 && (
          <div className="flex items-center justify-center bg-red-400 rounded-full h-[20px] w-[20px]">
          <p className="font-medium text-white text-center text-sm">
            {pendingRequests.length}
          </p>
        </div>
        )}

        
        <div className="bg-white rounded-full flex justify-between items-center py-2 px-4">
          <p className="font-semibold text-lg">Courses List</p>
          <div className="flex items-center space-x-3">
           {/* <div className="cursor-pointer hover:bg-stone-100 p-2 rounded-full transition-all">
              <FaSortAlphaDownAlt className="text-stone-800" />
            </div>*/}
            <div className="flex items-center">
              <input
                placeholder="Search by name"
                className="text-sm focus:outline-none focus:border-b-stone-400 border-b-transparent border-b-[1.5px] pr-2 py-1 font-medium text-stone-600"
                value={searchInput}
                onChange={handleSearchChange}
              />
              <IoMdSearch />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center mt-2">
          <button
            onClick={() => navigate("/create-new-course/1")}
            className="linearGradient_ver1 text-white text-sm px-[.4rem] py-[.25rem] rounded-full font-medium flex items-center hover:px-[.5rem] hover:py-[.3rem] transition-all"
          >
            <IoIosAdd className="mr-1 text-lg" />
            Create new course
          </button>
        </div>
        <div className="bg-white py-2 px-4 mt-3 rounded-lg">
  {loaded ? (
    <table className="table-auto w-full">
      <thead className="">
        <tr>
          <th>Course Name</th>
          <th>Created by</th>
          <th>Created at</th>
          <th>Complexity</th>
          <th className="text-end">Options</th>
        </tr>
      </thead>
      <tbody>
        {filteredCourses.map((course) => {
          return <CourseCard course={course} formatCreatedAt={formatCreatedAt} handleDelete={handleDelete} />;
        })}
      </tbody>
    </table>
  ) : (
    <div className="flex items-center justify-center">
      <SpinnerLoader />
    </div>
  )}
</div>
      </div>
    </div>
  );
};

const CourseCard = ({ course, formatCreatedAt, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <tr key={course._id} className="text-sm border-5 border-transparent">
      <td>{course.title}</td>
      <td>{course.creator.username}</td>
      <td>{formatCreatedAt(course.createdAt)}</td>
      <td>{course.age}</td>
      <td className="flex space-x-2 items-center justify-end">
        <div
          onClick={() => navigate(`/course-editor/homePage/${course._id}`)}
          className="p-2 hover:bg-blue-200 transition-all bg-blue-100 rounded-full cursor-pointer hover-parent"
        >
          <RiEdit2Fill className="text-md text-blue-700" />
          <OnHoverExtraHud name={"Edit"} />
        </div>

        <div onClick={()=>handleDelete(course._id)}
        className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent">
          <RiDeleteBin7Fill className="text-md text-red-600 " />

          <OnHoverExtraHud name={"Delete"} />
        </div>
      </td>
    </tr>
  );
};



const RequestCard = ({ item }) => {
  const [doubleValidating, setDoubleValidating] = useState(false);
  const [acceptPetition, setAcceptPetition] = useState(true);
  const navigate = useNavigate();

  const triggerValidation = (accept) => {
    setAcceptPetition(accept);
    setDoubleValidating(true);
  };

  return (
    <tr key={item._id} className="text-sm border-5 border-transparent">
      {doubleValidating && (
        <AcceptRejectPetition
          setOpen={setDoubleValidating}
          open={doubleValidating}
          accept={acceptPetition}
          id={item._id}
          course={item}
        />
      )}
      <td className="">{item.creator.username}</td>
      <td>{item.age}</td>
      <td>{item.title}</td>
      <td className=" flex space-x-2 items-center justify-end">
        <div
          onClick={() => navigate("/admin/educators/view?id=" + item._id)}
          className="p-2 hover:bg-blue-200 transition-all bg-blue-100 rounded-full cursor-pointer hover-parent"
        >
          <FaRegEye className="text-md text-blue-700 " />
          <OnHoverExtraHud name={"View Application"} />
        </div>
        <div
          onClick={() => triggerValidation(true)}
          className="p-2 hover:bg-green-200 transition-all bg-green-100 rounded-full cursor-pointer hover-parent"
        >
          <MdDone className="text-md text-green-700 " />
          <OnHoverExtraHud name={"Accept "} />
        </div>
        <div
          onClick={() => triggerValidation(false)}
          className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent"
        >
          <MdClose className="text-md text-red-700 " />
          <OnHoverExtraHud name={"Reject"} />
        </div>
      </td>
    </tr>
  );
};

export default AdminManageCourses;
