import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import GeneralNavbar from "../../../components/navbar/GeneralNavbar";
import styles from "../../../Styles";
import CourseContent from "../../../components/course-content/CourseContent";
import GeneralFooter from "../../../components/footer/GeneralFooter";
import { FaUsers } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import ReviewCard from "../../../components/review-card/ReviewCard";
import RedommendedCourse from "../../../components/recommended-course/RedommendedCourse";
import BluredText from "../../../components/blured-text/BluredText";
import CommentsPopUp from "../../../components/coments-pop-up/CommentsPopUp";

const CoursePage = () => {


  const testDataReviews =[
    {
      id: "_twxm5sbdg",
      at: "2021-11-09T13:53:43.000Z",
      user: {
        userName: "user123",
        pfp: "https://i.imgur.com/fHMzxUM.jpeg"
      },
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla leo nec leo dictum, vel viverra turpis consequat.",
      stars: 3
    },
    {
      id: "_kf1cmuj0z",
      at: "2020-05-24T06:11:23.000Z",
      user: {
        userName: "cool_user",
        pfp: "https://i.imgur.com/fHMzxUM.jpeg"
      },
      comment: "Aenean id lacus in tortor rutrum lacinia sed ac dolor. Integer efficitur, orci et tincidunt bibendum, libero arcu finibus lectus, nec convallis turpis velit eu purus. Nullam aliquam purus in justo posuere, vitae egestas neque dignissim.",
      stars: 5
    },
    {
      id: "_2ox5mly2m",
      at: "2019-12-01T08:36:34.000Z",
      user: {
        userName: "john_doe",
        pfp: "https://i.imgur.com/fHMzxUM.jpeg"
      },
      comment: "Pellentesque tincidunt urna in massa consequat, a facilisis turpis volutpat. Integer pretium, quam id lacinia congue, est turpis tempus eros, vitae gravida eros sem id orci.",
      stars: 4
    },
    {
      id: "_mo9znei4a",
      at: "2022-06-21T20:39:20.000Z",
      user: {
        userName: "random_user123",
        pfp: "https://i.imgur.com/fHMzxUM.jpeg"
      },
      comment: "Duis id lorem in quam faucibus cursus ac nec libero. Sed viverra risus a tortor tincidunt, quis aliquet odio venenatis.",
      stars: 2
    },
    {
      id: "_nz3j1pam3",
      at: "2023-02-28T01:45:56.000Z",
      user: {
        userName: "awesome_user99",
        pfp: "https://i.imgur.com/fHMzxUM.jpeg"
      },
      comment: "Vestibulum et nunc eget metus tincidunt fermentum. Integer ullamcorper urna velit, ut consequat elit aliquam et.",
      stars: 1
    }
  ]
  useEffect(() => {
    if (document.documentElement.scrollTop) {
      document.documentElement.scrollTop = 0;
    } else {
      document.body.scrollTop = 0;
    }
  },[])

  return (
    <div className="h-full w-full ">
      <GeneralNavbar />
      <div className="flex items-center mx-auto  max-w-[1400px] my-3 border-b pb-1 md:px-0 px-2">
        <div className="flex sm:flex-row flex-col justify-between w-full sm:items-end items-start  h-auto">
          <div className="flex  items-end space-x-2 h-full">
            <div className="flex sm:flex-row flex-col sm:items-end items-start space-x-1">
              <div className="xl:w-[390px] xl:h-[200px] lg:w-[330px] lg:h-[180px] md:w-[290px] md:h-[150px] sm:w-[220px] sm:h-[120px] w-[270px] h-[140px]">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png"
                />
              </div>
              <div>
                <p className="font-semibold md:text-2xl text-lg flex items-center">
                  Course Name{" "}
                  <span className="flex items-center mx-2 text-sm">
                    (4.5) <FaStar className="text-yellow-400" />
                  </span>
                </p>

                <p className="sm:text-sm text-xs">1000 students</p>
                <p className="sm:text-sm text-xs">
                  Created by{" "}
                  <span className="hover:underline cursor-pointer">
                    Creator name
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end w-full sm:w-auto space-x-2 h-full mt-2 sm:mt-0">
            <button
              className={`flex items-center  font-medium linearGradient_ver1 text-white py-2 px-3 rounded-md text-sm`}
            >
              Suscribe <IoMdAdd className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start mx-auto lg:flex-row flex-col  max-w-[1200px] my-3  pb-1 min-h-[80vh] sm:px-0 px-2">
        <div className=" w-full flex flex-col space-y-2">
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
              <div className="sm:text-sm text-xs">
                <BluredText
                  text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ipsa
                quod suscipit reiciendis dolore deserunt vitae ad porro aliquid
                eligendi magnam, libero obcaecati! Laboriosam corporis repellat quidem
                natus minus exercitationem? Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Distinctio temporibus veniam molestias nihil itaque.
                consequuntur veritatis. Quas nihil maiores ipsa. Totam rerum ab
                temporibus ducimus atque beatae deleniti delectus impedit. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Dolores vitae ab, itaque
                eligendi harum quam officia veritatis error alias deserunt quibusdam
                voluptatibus, ipsam provident qui autem molestiae aut ipsa earum.`}
                  limit={700}
                />
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
            <div className="flex items-center space-x-2">
              <img
                className="h-[100px] w-[100px] rounded-full"
                src="https://pbs.twimg.com/media/DiAZ4U4WsAEBNBd.jpg"
                alt="profile-picture"
              />
              <div>
                <p className="font-semibold text-sm">Nil Ojeda</p>
                <div className="flex space-x-2">
                  <p className="flex items-center">
                    <FaUsers className="mx-1" />
                    <span className="text-xs">1000 students</span>
                  </p>
                  <p className="flex items-center">
                    <FaPlayCircle className="mx-1" />
                    <span className="text-xs">20 Courses</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="text-xs mt-2">
              <BluredText
                text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ipsa
                quod suscipit reiciendis dolore deserunt vitae ad porro aliquid
                eligendi magnam, libero obcaecati! Laboriosam corporis repellat quidem
                natus minus exercitationem? Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Distinctio temporibus veniam molestias nihil itaque.
                consequuntur veritatis. Quas nihil maiores ipsa. Totam rerum ab
                temporibus ducimus atque beatae deleniti delectus impedit. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Dolores vitae ab, itaque
                eligendi harum quam officia veritatis error alias deserunt quibusdam
                voluptatibus, ipsam provident qui autem molestiae aut ipsa earum.`}
                limit={700}
              />
            </div>
          </div>
        </div>

        {/* RIGTH SIDE */}
        <div className="lg:w-[50%] flex flex-col  w-full sm:p-3 p-1">
          <p className="text-md font-bold">Similar Courses</p>
          {/* MAX 5 REVIEWS  */}
          <RedommendedCourse />
          <RedommendedCourse />
          <RedommendedCourse />
          <RedommendedCourse />
          <RedommendedCourse />
          <p className="text-md font-bold mt-3">Reviews</p>
          {/* MAX 4 REVIEWS  */}
          {
            testDataReviews.map((item, index) => {
              return (
                <div key={item.id}>
                  <ReviewCard data={item}/>   
                </div>
              )
            })
          }
        </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default CoursePage;
