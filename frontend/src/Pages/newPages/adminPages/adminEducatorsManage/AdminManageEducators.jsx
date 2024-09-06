import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import ViewEducatorApplication from "./ViewEducatorApplication";
import BlobComposition from "../../../../components/backgrounds/BlobComposition/BlobComposition";
import { IoMdSearch } from "react-icons/io";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { useSelector } from "react-redux";

import OnHoverExtraHud from "../../../../components/OnHoverExtraHud";
import EditEducator from "./EditEducator";
import getTeachers from "../../../../BackendProxy/adminProxy/getTeachers";
const AdminManageEducators = () => {
  const authUser = useSelector((state) => state.user);
  const navigate = useNavigate()
  const { screen } = useParams();

  const [users, setUsers] = useState([])
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllTeachers()
    // (authUser.institution.code)
  },[])

  const getAllTeachers = async (code) => {
    try {
      const res = await getTeachers(code);
      setUsers(res);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }

  const checkScreen = (screen) => {
    switch (screen){
        case 'view':
            return <ViewEducatorApplication/>
        case 'edit':
            return <EditEducator/>
        default:
            navigate('/admin/educators')
            return
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
      {screen ? (
        checkScreen(screen)
      ) : (
        <div className="m-auto max-w-[1200px] mt-3 min-h-[100vh]">


          <div className="bg-white rounded-full flex justify-between items-center py-2 px-4">
            <p className="font-semibold text-lg">Existing Educators</p>
            <div className="flex items-center space-x-3">
              <div className="cursor-pointer hover:bg-stone-100 p-2 rounded-full transition-all">
                <FaSortAlphaDownAlt className="text-stone-800" />
              </div>
              <div className="flex items-center">
                <input
                  placeholder="Search by name"
                  className="text-sm focus:outline-none  focus:border-b-stone-400 border-b-transparent border-b-[1.5px]  pr-2 py-1 font-medium text-stone-600 "
                />
                <IoMdSearch />
              </div>
            </div>
          </div>
          <div className="my-2 flex items-center justify-end">
          <button 
          onClick={() => {navigate('/admin/invite/educators')}}
          className={`text-white font-medium px-3 py-1 rounded-full linearGradient_ver1 text-sm hover:scale-[1.05] transition-all`}>
            + Invite Educators
          </button>
        </div>
          <div className="bg-white py-2 px-4 mt-3 rounded-lg">
            <table className="table-auto w-full">
              <thead className="">
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th className="text-end">Options</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  return(
                    <TeacherCard user={user}/>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const TeacherCard = ({user}) => {

  const navigate = useNavigate()

  return (
    <tr key={user._id} className="text-sm border-5 border-transparent">
      <td className="">{user.username}</td>
      <td>{user.email}</td>

      <td className=" flex space-x-2 items-center justify-end">
        <div className="p-2 hover:bg-blue-200 transition-all bg-blue-100 rounded-full cursor-pointer hover-parent">
          <RiDeleteBin7Fill className="text-md text-blue-700 " />
          <OnHoverExtraHud name={"Delete"} />
        </div>
        <div onClick={() => navigate('/admin/educators/edit?id=aaaa')} className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent">
          <RiEdit2Fill className="text-md text-red-600 "/>
          <OnHoverExtraHud name={"Edit"} />
        </div>
      </td>
    </tr>
  );
};

const RequestCard = () => {
  const navigate = useNavigate()

  return (
    <tr className="text-sm border-5 border-transparent">
      <td className="">Student Name</td>
      <td>Feb 20 - 2020</td>
      <td>Grade 9 Astronomy</td>
      <td className=" flex space-x-2 items-center justify-end">
        <div onClick={() => navigate('/admin/educators/view?id=aaaa')} className="p-2 hover:bg-blue-200 transition-all bg-blue-100 rounded-full cursor-pointer hover-parent">
          <FaRegEye className="text-md text-blue-700 " />
          <OnHoverExtraHud name={"View Application"} />
        </div>
        <div className="p-2 hover:bg-green-200 transition-all bg-green-100 rounded-full cursor-pointer hover-parent">
          <MdDone className="text-md text-green-700 " />
          <OnHoverExtraHud name={"Accept "} />
        </div>
        <div className="p-2 hover:bg-red-200 transition-all bg-red-100 rounded-full cursor-pointer hover-parent">
          <MdClose className="text-md text-red-700 " />
          <OnHoverExtraHud name={"Reject"} />
        </div>
      </td>
    </tr>
  );
};

export default AdminManageEducators;
