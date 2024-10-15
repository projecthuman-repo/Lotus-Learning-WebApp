import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import BlobComposition from "../../../../components/backgrounds/BlobComposition/BlobComposition";
import { IoMdSearch } from "react-icons/io";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { FiDownload } from "react-icons/fi"; 
import { useSelector } from "react-redux";
import OnHoverExtraHud from "../../../../components/OnHoverExtraHud";
import getStudents from "../../../../BackendProxy/adminProxy/getStudents";
import styles from "../../../../Styles";
import * as XLSX from "xlsx";
import axios from "axios";

const AdminManageStudents = () => {
  const authUser = useSelector((state) => state.user);
  const { screen } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllStudents(authUser.institution.code);
  }, []);

  const getAllStudents = async (code) => {
    try {
      const res = await getStudents(code);
      setStudents(res);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.username.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

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
        <div className="bg-white rounded-full flex justify-between items-center py-2 px-4">
          <p className="font-semibold text-lg">Students List</p>
           <div className="flex items-center space-x-3">
            {/*<div className="cursor-pointer hover:bg-stone-100 p-2 rounded-full transition-all">
              <FaSortAlphaDownAlt className="text-stone-800" />
            </div>*/}
            <div className="flex items-center">
              <input
                placeholder="Search by name"
                className="text-sm focus:outline-none focus:border-b-stone-400 border-b-transparent border-b-[1.5px] pr-2 py-1 font-medium text-stone-600"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <IoMdSearch />
            </div>
          </div>
        </div>
        <div className="my-2 flex items-center justify-end">
          <button
            onClick={() => {
              navigate("/admin/invite/students");
            }}
            className={`text-white font-medium px-3 py-1 rounded-full linearGradient_ver1 text-sm hover:scale-[1.05] transition-all`}
          >
            + Invite students
          </button>
        </div>
        <div className="bg-white py-2 px-4 mt-1 rounded-lg">
          <table className="table-auto w-full">
            <thead className="">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th className="text-end">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((item) => (
                <tr key={item._id} className="text-sm border-5 border-transparent">
                  <StudentCard student={item} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StudentCard = ({ student }) => {
  // Function to handle downloading the Excel file
  const downloadGrades = async (studentId, studentName) => {
    try {
      const response = await axios.get(`http://localhost:5000/course/get-all-grades/${studentId}`);
      const gradesData = response.data.data;

      if (gradesData.length === 0) {
        alert("No grades available for this student.");
        return;
      }

      // Format the data for Excel
      const worksheetData = gradesData.map((grade) => ({
        'Course': grade.course,
        'Lesson ID': grade.lessonId,
        'Lesson Title': grade.lessonTitle,
        'Grade': grade.grade,
      }));

      // Create the Excel sheet
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');

      // Generate and trigger Excel file download
      XLSX.writeFile(workbook, `${studentName}_grades.xlsx`);
    } catch (error) {
      console.error('Error downloading grades:', error);
    }
  };


  return (
    <>
      <td>{student.username}</td>
      <td>{student.email}</td>
      <td className="flex space-x-2 items-center justify-end">
        {/* Delete Button */}
        <div className="p-2 hover:bg-blue-200 transition-all bg-blue-100 rounded-full cursor-pointer hover-parent">
          <RiDeleteBin7Fill className="text-md text-blue-700 " />
          <OnHoverExtraHud name={"Delete"} />
        </div>
        {/* Edit Button */}
        <div
          className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent"
        >
          <RiEdit2Fill className="text-md text-red-600 " />
          <OnHoverExtraHud name={"Edit"} />
        </div>
        {/* Download Grades Button */}
        <div
          className="p-2 hover:bg-green-200 transition-all bg-green-100 rounded-full cursor-pointer hover-parent"
          onClick={() => downloadGrades(student._id,student.username)} // Download functionality
        >
          <FiDownload className="text-md text-green-600 " /> {}
          <OnHoverExtraHud name={"Download Grades"} /> {}
        </div>
      </td>
    </>
  );
};



export default AdminManageStudents;
