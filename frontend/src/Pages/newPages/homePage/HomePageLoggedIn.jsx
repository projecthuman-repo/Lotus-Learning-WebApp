import React from "react";
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
import AddCourseButton from "../../../components/buttons/addCourseButton";


const HomePageLoggedIn = () => {
  return (
    <div className="h-full w-full ">
      <GeneralNavbar />
      <div className="w-full mx-auto  pb-2 flex items-center flex-col">
        <div className="xl:w-[1350px] lg:w-[1000px] w-full">
          <CarrouselHeader />
        </div>
        <div className="xl:w-[1350px] lg:w-[1000px] w-full">
        <div className="flex justify-between items-center">
            <p className="mt-3 font-semibold md:text-xl sm:text-md text-sm text-stone-700">
                Continue your classes
            </p>
            <AddCourseButton />
        </div>
          <CarrouselShowCase>
            <SwiperSlide className="flex items-start justify-center pb-5">
              <Math11CourseCard/>
            </SwiperSlide>
            <SwiperSlide className="flex items-start justify-center pb-5">
              <Geoscience12CourseCard/>
            </SwiperSlide>
            <SwiperSlide className="flex items-start justify-center pb-5">
              <ComputerScience11CourseCard/>
            </SwiperSlide>
            <SwiperSlide className="flex items-start justify-center pb-5">
              <ItemSlide />
            </SwiperSlide>
            <SwiperSlide className="flex items-start justify-center pb-5">
              <English11CourseCard/>
            </SwiperSlide>
          </CarrouselShowCase>

        </div>
        <div className="xl:w-[1400px] lg:w-[1000px] w-full flex ">
          <p className="font-semibold md:text-xl sm:text-md text-sm  text-stone-700">Recommended for you</p>
        </div>
        <div className="max-w-[1400px] mx-auto py-2 flex items-center justify-center">
          
        <div className="grid md:gap-1 gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 ">

          {/* Added placeholder course cards for testing purposes */}
          <ComputerScience11CourseCard/>
          <Astronomy9CourseCard/>
          <Geoscience12CourseCard/>
          <Math11CourseCard/>
          <English12CourseCard/>
          <Math12CourseCard/>
          <Geography10CourseCard/>
          <English11CourseCard/>

        </div>
      </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default HomePageLoggedIn;
