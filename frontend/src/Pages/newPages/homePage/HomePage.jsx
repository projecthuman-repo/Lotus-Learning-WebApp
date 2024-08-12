import React, { useEffect, useState } from "react";
import GeneralNavbar from "../../../components/navbar/GeneralNavbar";
import CarrouselHeader from "../../../components/headers/CarrouselHeader";
import GeneralFooter from "../../../components/footer/GeneralFooter";
import CarrouselShowCase from "../../../components/carrousel-show-case/CarrouselShowCase";
import { SwiperSlide } from "swiper/react";
import ItemSlide from "../../../components/carrousel-show-case/ItemSlide";
import GeneralCourseCard from "../../../components/course-cards/GeneralCourseCard";
import Math11CourseCard from "../../../components/course-cards/Math11CourseCard";
import Math12CourseCard from "../../../components/course-cards/Math12CourseCard";
import English12CourseCard from "../../../components/course-cards/Englsh12CourseCard";
import English11CourseCard from "../../../components/course-cards/English11CourseCard";
import Geography10CourseCard from "../../../components/course-cards/Geography10CourseCard";
import Geoscience12CourseCard from "../../../components/course-cards/Geoscience12CourseCard";
import Astronomy9CourseCard from "../../../components/course-cards/Astronomy9CourseCard";
import ComputerScience11CourseCard from "../../../components/course-cards/ComputerScience11CourseCard";
import getCoursesByProp from "../../../BackendProxy/courseProxy/getCoursesByProp";
import { useSelector } from "react-redux";


const HomePage = () => {

  const [loadedCourses, setLoadedCourses] = useState(false)
  const [courses, setCourses] = useState([])
  const authUser = useSelector((state) => state.user);

  useEffect(() => {
    getAllAcceptedCourses()
  },[])

  const getAllAcceptedCourses = async () => {
    try {
      const res = await getCoursesByProp("accepted", true, authUser.institution.code);
      setCourses(res.res);
      setLoadedCourses(true)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-full w-full ">
      <GeneralNavbar />
      <div className="w-full mx-auto  pb-2 flex items-center flex-col">
        <div className="xl:w-[1350px] lg:w-[1px] w-full">
          <CarrouselHeader />000
        </div>
        <div className="xl:w-[1350px] lg:w-[1000px] w-full">

        </div>
        <div className="xl:w-[1400px] lg:w-[1000px] w-full flex ">
          <p className="pt-10 font-semibold md:text-xl sm:text-md text-sm  text-stone-700">Discover Our Course Offerings</p>
        </div>
        <div className="max-w-[1400px] mx-auto py-2 flex items-center justify-center">
          
        <div className="grid md:gap-1 gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 ">

          {/* Added placeholder course cards for testing purposes */}
          {/* <CarrouselShowCase>
            <SwiperSlide>
              <Astronomy9CourseCard/>
              </SwiperSlide>
          </CarrouselShowCase> */}
            {courses && courses.map((item, id) => {
              return (
                <div key={item._id}>
                  <GeneralCourseCard item={item}/>
                </div>
              )
            })}
        </div>
      </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default HomePage;
