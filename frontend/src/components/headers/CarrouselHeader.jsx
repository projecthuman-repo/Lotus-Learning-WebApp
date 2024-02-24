import React from "react";
import { Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./carrouselStyles.css"
const CarrouselHeader = () => {
  return (
    <div className="w-full  md:h-[25vw] sm:h-[40vw] h-[75vw] noUserSelect relative pt-1 no-select">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 10500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation, Scrollbar]}
        className="w-full h-full  swiper-hero "
      >
        <SwiperSlide className=" flex items-center justify-center border rounded-md p-1 animated_linearGradient_ver3">
          <div className="h-full w-full flex items-center justify-evenly  p-2">
            <p className="text-white font-semibold text-2xl w-[40%]">
              Let's give learning a different perspective!
            </p>
            <div className="w-[40%]"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" flex items-center justify-center border rounded-md animated_linearGradient_ver2">
        <div className="h-full w-full flex items-center justify-evenly  p-2">
            <p className="text-white font-semibold text-2xl w-[40%]">
              Let's give learning a different perspective!
            </p>
            <div className="w-[40%]"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" linearGradient_ver4 border rounded-md animated_linearGradient_ver4">
        <div className="h-full w-full flex items-center justify-evenly  p-2">
            <p className="text-white font-semibold text-2xl w-[40%]">
              Let's give learning a different perspective!
            </p>
            <div className="w-[40%]"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CarrouselHeader;
