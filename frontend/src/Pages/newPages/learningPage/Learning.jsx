import React, { useState } from 'react'
import GeneralNavbar from '../../../components/navbar/GeneralNavbar'
import GeneralFooter from '../../../components/footer/GeneralFooter'
import LearningNavbar from '../../../components/navbar/LearningNavbar'
import { IoArrowBack } from "react-icons/io5";
import ClassCards from '../../../components/learning-components/ClassCards';



const Learning = () => {

  const [openSideMenu, setOpenSideMenu] = useState(true)

  return (
    <div>
        {/* SEND COURSE DATA TO THE NAVBAR AFTER THE FETCH */}
        <LearningNavbar/>
        <div className='h-[80vh] flex relative'>
          <div className={`w-[40%] h-full border-r ${openSideMenu? "relative" : " absolute -left-[100%]"}`}>
            <div className='flex justify-between items-center py-2 px-3'>
              <p className='font-semibold text_linearGradient_ver1   '>Course Content </p>
              <div onClick={() => setOpenSideMenu(false)} className='p-2 hover:bg-stone-100 cursor-pointer rounded-full'>
                <IoArrowBack />
              </div>
            </div>
            {/* Course Conten */}
            <div>
              <ClassCards />
              <ClassCards/>
              <ClassCards/>
            </div>
          </div>
          <div className='w-full  relative'>
            {!openSideMenu && <div onClick={() => setOpenSideMenu(true)} className='h-[30px]  pl-1 text_linearGradient_ver1 cursor-pointer hover:pl-3 transition-all'>Course Content {'>>'} </div>}
            <div>dspfovjds</div>
          </div>
        </div>
        <GeneralFooter/>
    </div>
  )
}

export default Learning