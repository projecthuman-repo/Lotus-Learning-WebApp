import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./adminHomeStyles.css";
import GeneralNavbar, {
  noPfpGenerator,
} from "../../../../components/navbar/GeneralNavbar";
import BlobComposition from "../../../../components/backgrounds/BlobComposition/BlobComposition";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaChessKnight,
} from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import GeneralFooter from "../../../../components/footer/GeneralFooter";
import OnHoverExtraHud from "../../../../components/OnHoverExtraHud";

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
      <div className="m-auto max-w-[1200px] mt-3 min-h-[100vh] p-4 md:p-8">
        <div className="flex flex-row items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <div className="rounded-full h-[120px] md:h-[160px] w-[120px] md:w-[160px] flex items-center justify-center text-2xl md:text-4xl font-bold bg-black text-white">
              {noPfpGenerator(authUser.username)}
            </div>
            <div>
              <p className="text-lg md:text-2xl font-semibold">
                {authUser.username}
              </p>
              <p className="text-sm font-base">{authUser.email}</p>
            </div>
          </div>
          <div className="p-2 rounded-full cursor-pointer parent-option hover-parent">
            <IoIosSettings className="text-xl md:text-2xl option" />
            <OnHoverExtraHud name="Account settings" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          <div onClick={() => navigate("/admin/students")}>
            <OptionCard
              name="Manage Students"
              icon={<FaUserGraduate />}
              color="yellow"
            />
          </div>
          <div onClick={() => navigate("/admin/educators")}>
            <OptionCard
              name="Manage Educators"
              icon={<FaChalkboardTeacher />}
              color="green"
            />
          </div>
          <div onClick={() => navigate("/admin/courses/")}>
            <OptionCard name="Manage Courses" icon={<FaBook />} color="red" />
          </div>
         
        </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

const OptionCard = ({ name, icon, color }) => {
  return (
    <div
      className={`cursor-pointer overflow-hidden h-[280px] md:h-[320px] w-full sm:w-[260px] rounded-lg card-parent shadow-sm parent-${color} no-select`}
    >
      <div className="h-[70%] w-full flex items-center justify-center">
        <div className="bg-[#55555544] icon-child rounded-full">
          <div className="text-3xl md:text-4xl text-white">{icon}</div>
        </div>
      </div>
      <div
        className={`h-[30%] w-full flex items-center justify-center bottom-card ${color}`}
      >
        <p className="font-semibold text-md md:text-lg">{name}</p>
      </div>
    </div>
  );
};

export default AdminHomePage;
