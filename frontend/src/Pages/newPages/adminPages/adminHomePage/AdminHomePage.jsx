import React from "react";
import { useNavigate } from "react-router-dom";

import "./adminHomeStyles.css";
import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import BlobComposition from "../../../../components/backgrounds/BlobComposition/BlobComposition";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaChessKnight } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import GeneralFooter from "../../../../components/footer/GeneralFooter";
import OnHoverExtraHud from "../../../../components/OnHoverExtraHud";
import { useSelector } from "react-redux";

const AdminHomePage = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user);

  return (
    <div className="relative h-full">
      <GeneralNavbar />
      <BlobComposition
        blobsData={[
          { top: "10%", left: "-20%", size: "700px" },
          { top: "-30%", left: "70%", size: "400px" },
          { top: "40%", left: "50%", size: "300px" },
        ]}
      />
      <div className="m-auto max-w-[1200px] mt-3 min-h-[100vh]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 ">
            <div className="rounded-full h-[160px] w-[160px] bg-stone-400"></div>
            <div>
              <p className="text-2xl font-semibold">{authUser.username}</p>
              <p className="text-sm font-base">{authUser.email}</p>
            </div>
          </div>
          <div className="p-2  rounded-full cursor-pointer parent-option hover-parent">
            <IoIosSettings className="text-2xl option" />
            <OnHoverExtraHud name="Account settings" />
          </div>
        </div>
        <div className="mt-4 flex justify-evenly space-x-2">
          <div onClick={() => navigate("/admin/students")}>
            <OptionCard
              name="Manage Students"
              icon={<FaUserGraduate />}
              color={"yellow"}
            />
          </div>
          <div onClick={() => navigate("/admin/educators")}>
            <OptionCard
              name="Manage Educators"
              icon={<FaChalkboardTeacher />}
              color={"green"}
            />
          </div>
          <div onClick={() => navigate('/admin/courses/')}>
          <OptionCard name="Manage Courses" icon={<FaBook />} color={"red"} />
          </div>
          <OptionCard
            name="Manage Games"
            icon={<FaChessKnight />}
            color={"blue"}
          />
        </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

const OptionCard = ({ name, icon, color }) => {
  return (
    <div
      className={`cursor-pointer overflow-hidden h-[320px] w-[260px]  rounded-lg card-parent shadow-sm parent-${color} no-select`}
    >
      <div className="h-[75%] w-full  flex items-center justify-center">
        <div className="bg-[#55555544] icon-child rounded-full">
          <div className="text-4xl text-white">{icon}</div>
        </div>
      </div>
      <div
        className={`h-[25%] w-full flex items-center justify-center bottom-card ${color}`}
      >
        <p className="font-semibold text-lg ">{name}</p>
      </div>
    </div>
  );
};

export default AdminHomePage;
