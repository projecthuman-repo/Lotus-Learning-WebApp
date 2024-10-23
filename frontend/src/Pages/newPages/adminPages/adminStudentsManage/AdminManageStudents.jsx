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

  const filteredStudentIds = filteredStudents.map(student => student._id);

  const downloadGradesAsZip = async () => {
    try {
      const response = await axios.post('http://localhost:5001/course/download-zip-students-grades', {
        studentIds: filteredStudentIds, 
      }, {
        responseType: 'blob', // This ensures you handle the zip file as binary data
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'students_grades.zip'); // File name for download
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the zip file:', error);
    }
  };

  const downloadGradesOneFile= async () => {
    try {
    
          let allGrades = [];
      
          // Loop through the filtered students
          for (const student of filteredStudents) {
            const response = await axios.get(`http://localhost:5001/course/get-all-grades/${student._id}`);
            const gradesData = response.data.data;
      
            if (gradesData.length > 0) {
              // Calculate cumulative grade as the average of all grades
              const totalGrades = gradesData.reduce((sum, item) => sum + item.grade, 0);
              const cumulativeGrade = (totalGrades / gradesData.length).toFixed(2); // Average grade
      
              // Add individual grades for the student
              const studentGrades = gradesData.map((item) => ({
                'Email': student.email,
                'Student': student.username,
                'Course': item.course, 
                'Lesson Title': item.lessonTitle,
                'Grade': item.grade.toFixed(2),
                'Type of Grade': 'Individual',
              }));
      
              // Add the individual grades to the allGrades array
              allGrades = [...allGrades, ...studentGrades];
      
              // Add cumulative grade row for the student (using first course for consistency)
              allGrades.push({
                'Email': student.email,
                'Student': student.username,
                'Course': gradesData[0].course, // Use the first course entry
                'Lesson Title': '',
                'Grade': cumulativeGrade,
                'Type of Grade': 'Cumulative',
              });
            }
          }
  
      // If no grades are found, show an alert
      if (allGrades.length === 0) {
        alert("No grades available for the filtered students.");
        return;
      }
  
      // Create an Excel sheet from the grades data
      const worksheet = XLSX.utils.json_to_sheet(allGrades);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Students Grades');
  
      // Auto-adjust column widths based on content
      const maxWidth = (data) =>
        Math.max(...data.map((item) => (item ? item.toString().length : 0))) + 3;
  
      worksheet['!cols'] = [
        { wch: maxWidth(allGrades.map((row) => row.Email)) },
        { wch: maxWidth(allGrades.map((row) => row.Student)) },
        { wch: maxWidth(allGrades.map((row) => row.Course)) },
        { wch: maxWidth(allGrades.map((row) => row['Lesson Title'])) },
        { wch: maxWidth(allGrades.map((row) => row.Grade)) },
        { wch: maxWidth(allGrades.map((row) => row['Type of Grade'])) },
      ];
  
      // Write the Excel file and trigger the download
      XLSX.writeFile(workbook, `Students_Grades.xlsx`);
    } catch (error) {
      console.error('Error downloading students grades:', error);
    }
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
          <button
    onClick={downloadGradesOneFile}
    className={`text-white font-medium px-3 py-1 ml-3 rounded-full linearGradient_ver1 text-sm hover:scale-[1.05] transition-all`}
  >
    Download All Grades
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
 
  const downloadGrades = async (studentId, studentName) => {
    try {
      const response = await axios.get(`http://localhost:5001/course/get-all-grades/${studentId}`);
      const gradesData = response.data.data;
  
      if (gradesData.length === 0) {
        alert("No grades available for this student.");
        return;
      }
  
      // Calculate the cumulative grade (average of all individual grades)
      const totalGrades = gradesData.reduce((sum, grade) => sum + grade.grade, 0);
      const cumulativeGrade = (totalGrades / gradesData.length).toFixed(2);
  
      // Format the data for Excel with individual grades
      const worksheetData = gradesData.map((grade) => ({
        'Course': grade.course,
        'Lesson Title': grade.lessonTitle,
        'Grade': grade.grade.toFixed(2),
        'Type of Grade': 'Individual',
      }));
  
      // Add cumulative grade row 
      worksheetData.push({
        'Course': gradesData[0].course, // Keep the course name consistent
        'Lesson Title': '', 
        'Grade': cumulativeGrade,
        'Type of Grade': 'Cumulative',
      });
  
      // Create the worksheet
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  
      // Auto-adjust column widths
      const maxWidth = (data) =>
        Math.max(...data.map((item) => (item ? item.toString().length : 0))) + 3;
  
      worksheet['!cols'] = [
        { wch: maxWidth(worksheetData.map((row) => row.Course)) },
        { wch: maxWidth(worksheetData.map((row) => row['Lesson Title'])) },
        { wch: maxWidth(worksheetData.map((row) => row.Grade)) },
        { wch: maxWidth(worksheetData.map((row) => row['Type of Grade'])) },
      ];
  
      // Create and download the Excel file
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');
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
