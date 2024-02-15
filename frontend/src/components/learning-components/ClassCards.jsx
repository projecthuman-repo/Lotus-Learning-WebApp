import React, { useState } from 'react'
import CustomCheckBox from '../custom-check-box/CustomCheckBox'
import {  RiFile3Line } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { AiFillAudio } from "react-icons/ai";
import { RiGameLine } from "react-icons/ri";

const ClassCards = () => {

  const [value, setValue] = useState(false)

  return (
    <div className='p-2 px-3 flex items-center justify-between cursor-pointer h-[60px] no-select hover:bg-stone-50 border-r-4 border-stone-800'> 
    {/* border-transparent */}
        <div className='flex items-center'>
          <CustomCheckBox value={value} setValue={setValue}/>
          <p className=' text-sm mx-1 font-medium text-stone-600'>Class ajaja</p>
        </div>
        <p className='flex items-center text-xs'><MdOndemandVideo className='text-sm mr-2'/>25min </p>
    </div>
  )
}

export default ClassCards