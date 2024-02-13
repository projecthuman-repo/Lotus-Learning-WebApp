import React from "react";
import { FaStar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import GeneralNavbar from "../../../components/navbar/GeneralNavbar";
import styles from "../../../Styles";
import CourseContent from "../../../components/course-content/CourseContent";
import GeneralFooter from "../../../components/footer/GeneralFooter";

const CoursePage = () => {
  return (
    <div className="h-full w-full ">
      <GeneralNavbar />
      <div className="flex items-center mx-auto  max-w-[1400px] my-3 border-b pb-1">
        <div className="flex justify-between w-full items-center h-[200px]">
          <div className="flex items-end space-x-2 h-full">
            <div className="w-[390px] h-full">
              <img
                className="w-full h-full object-cover rounded-md"
                src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png"
              />
            </div>
            <div>
              <p className="font-semibold text-2xl flex items-center">
                Course Name{" "}
                <span className="flex mx-2 text-sm">
                  (4.5) <FaStar />
                </span>
              </p>

              <p className="text-sm">1000 students</p>
              <p className="text-sm">
                Created by{" "}
                <span className="hover:underline cursor-pointer">
                  Creator name
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-end space-x-2 h-full ">
            <button
              className={`flex items-center  font-medium linearGradient_ver1 text-white py-2 px-3 rounded-md text-sm`}
            >
              Suscribe <IoMdAdd className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start mx-auto  max-w-[1200px] my-3  pb-1 min-h-[80vh]">
        <div className="w-full flex flex-col space-y-2">
          {/* Course Description */}
          <div className="w-full">
            <p className="my-2 text-md font-bold">Description</p>
            <div className="p-2">
              <p className="text-sm font-semibold mb-2">Course Name</p>
              <div className="flex flex-wrap space-x-2 text-xs mb-1 text_linearGradient_ver1">
                <div className="font-semibold cursor-pointer">#Algebra</div>
                <div className="font-semibold cursor-pointer">#IT</div>
                <div className="font-semibold cursor-pointer">#Maths</div>
                <div className="font-semibold cursor-pointer">#Health</div>
              </div>
              <div className=" fadeout_bottom">
                <p className="text-sm text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  ipsa quod suscipit reiciendis dolore deserunt vitae ad porro
                  aliquid eligendi magnam, libero obcaecati! Laboriosam corporis
                  repellat quidem natus minus exercitationem? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Distinctio temporibus
                  veniam molestias nihil itaque.
                  <br />
                  consequuntur veritatis. Quas nihil maiores ipsa. Totam rerum
                  ab temporibus ducimus atque beatae deleniti delectus impedit.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolores vitae ab, itaque eligendi harum quam officia veritatis
                  error alias deserunt quibusdam voluptatibus, ipsam provident
                  qui autem molestiae aut ipsa earum.
                </p>
              </div>
            </div>
          </div>
          {/* Course Content */}
          <div className="w-full">
            <p className="my-2 text-md font-bold">Course Content</p>
            <div>
              <p className="text-sm">
                5 Modules • 20 Classes • 20 hours of content
              </p>
            </div>
            <CourseContent />
          </div>
          {/* Course Creator */}
          <div className="w-full">
            <p className="my-2 text-md font-bold">Course Creator</p>
            <div>
              <p className="text-sm">
                5 Modules • 20 Classes • 20 hours of content
              </p>
            </div>
            <CourseContent />
          </div>
        </div>

        <div className="w-[50%] p-3 bg-green-200">
          <p>
            reviews
          </p>
          <p>
            recomended courses
          </p>
        </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default CoursePage;
