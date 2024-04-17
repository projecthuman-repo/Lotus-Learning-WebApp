import React from "react";
import LowProfileNavbar from "../../../components/navbar/LowProfileNavbar";
import GeneralFooter from "../../../components/footer/GeneralFooter";


const ForgotPassword = () => {
  return (
    <div className="h-full w-full ">
      <LowProfileNavbar />
      <div className="w-full mx-auto  pb-2 flex items-center flex-col">
        <div className="xl:w-[1350px] lg:w-[1000px] w-full">
          
        </div>
        <div className="xl:w-[1350px] lg:w-[1000px] w-full">

        </div>
        <div className="xl:w-[1400px] lg:w-[1000px] w-full flex ">
          <p className="pt-10 font-semibold md:text-xl sm:text-md text-sm  text-stone-900">Forgot Password</p>
        </div>
        <div className="max-w-[1400px] mx-auto py-2 flex items-center justify-center">
          
        <div className="grid md:gap-1 gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 ">

            
        </div>
      </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default ForgotPassword;
