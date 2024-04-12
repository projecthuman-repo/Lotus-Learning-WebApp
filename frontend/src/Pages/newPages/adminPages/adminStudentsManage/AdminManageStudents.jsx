import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import BlobComposition from "../../../../components/backgrounds/BlobComposition/BlobComposition";
import { IoMdSearch } from "react-icons/io";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";

import OnHoverExtraHud from "../../../../components/OnHoverExtraHud";

const AdminManageStudents = () => {

  const { screen } = useParams();

  useEffect(() => {

  },[])

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
        <div className="bg-white py-2 px-4 mt-3 rounded-lg">
          <table className="table-auto w-full" >
            <thead className="">
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th className="text-end">Options</th>
              </tr>
            </thead>
            <tbody>
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StudentCard = () => {
  return (
    <tr className="text-sm border-5 border-transparent">
      <td className="">Student Name</td>
      <td>Feb 20 - 2020</td>
      <td className=" flex space-x-2 items-center justify-end">
        <div className="p-2 hover:bg-stone-200 transition-all bg-stone-100 rounded-full cursor-pointer hover-parent">
            <RiDeleteBin7Fill className="text-md text-stone-700 "/>
            <OnHoverExtraHud name={'Delete'}/>
        </div>
        <div className="p-2 hover:bg-stone-200 transition-all bg-stone-100 rounded-full cursor-pointer hover-parent">
            <RiEdit2Fill  className="text-md text-stone-700 "/>
            <OnHoverExtraHud name={'Edit'}/>
        </div>

      </td>
    </tr>
  );
};

export default AdminManageStudents;
