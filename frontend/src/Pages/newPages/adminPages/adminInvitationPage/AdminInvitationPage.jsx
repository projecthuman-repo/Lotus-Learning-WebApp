import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import BlobComposition from "../../../../components/backgrounds/BlobComposition/BlobComposition";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { SiGooglesheets } from "react-icons/si";

const AdminInvitationPage = () => {
  const navigate = useNavigate();

  const { type } = useParams();

  useEffect(() => {
    if (!type) {
      navigate("/admin");
    }
  }, [type]);

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
        <div className="bg-white rounded-full flex justify-between items-center py-2 px-4">
          <p className="font-semibold text-lg">
            Invite {`${type === "students" ? "Students" : "Teachers"}`}
          </p>
          <div className="flex items-center space-x-3">
            <p className="flex items-center hover:bg-green-50 bg-green-100 cursor-pointer px-3 py-1 hover:scale-[1.05] transition-all rounded-full">
              <span className="text-sm mr-1 font-medium text-green-500">Upload your Exel</span>
            </p>
          </div>
        </div>
        <div className="bg-white rounded-full flex justify-between items-center py-2 px-4 mt-2">
          <p className="font-semibold text-lg">Invitations</p>
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
        <div className="bg-white py-2 px-4 my-3 rounded-lg">
            <table className="table-auto w-full">
            <thead className=" w-full">
                <tr>
                <th>Email</th>
                <th>Sent on </th>

                <th className="text-end">Status</th>
                </tr>
            </thead>
            <tbody className=" text-sm">
                <tr className="">
                <td>test@gmail.com</td>
                <td>July 1 - 1pm</td>
                <td className="flex justify-end">
                    <div className="px-2 text-sm flex items-center justify-center bg-green-500 rounded-full">
                        <p className="font-medium text-green-100">Accepted</p>
                    </div>
                </td>
                </tr>
                <tr>
                <td>test@gmail.com</td>
                <td>July 2 - 1pm</td>
                <td className="flex justify-end">
                    <div className="px-2 text-sm flex items-center justify-center bg-yellow-500 rounded-full">
                        <p className="font-medium text-yellow-100">Pending</p>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInvitationPage;
