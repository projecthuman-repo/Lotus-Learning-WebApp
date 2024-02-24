import React from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Navigation } from "swiper/modules";

import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

import '../headers/carrouselStyles.css'

const breakpoints = {
  400:{
    slidesPerView: 1.5,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2.5,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  1324: {
    slidesPerView: 3.8,
    spaceBetween: 10,
  },
};

const CarrouselShowCase = ({ children }) => {
  return (
    <Swiper
      breakpoints={breakpoints}
      spaceBetween={0}
      slidesPerView={1.8}
      loop={true}
      modules={[Navigation, Pagination]}
      navigation={true}

      className="w-full noUserSelect pb-10 pt-3 swiper-hero no-select "
    >
      {children}
    </Swiper>
  );
};

export default CarrouselShowCase;
