import React from 'react'
import { MdOutlineDone } from "react-icons/md";

const CustomCheckBox = ({value, setValue}) => {
  return (
    <div onClick={() => setValue(!value)} className={`relative h-[15px] w-[15px]  flex items-center justify-center rounded-sm  ${value? "bg-black border-black":"bg-white border"} `}>
        <MdOutlineDone className='text-white '/>
    </div>
  )
}

export default CustomCheckBox