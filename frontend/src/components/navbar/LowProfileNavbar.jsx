import React from 'react'
import logo from "../../Images/lotusletters.webp";

const LowProfileNavbar = () => {
  return (
    <div className='w-full h-[4rem]  mb-4 box-shadow '>
        <div className='max-w-[1450px] mx-auto h-full flex justify-center items-center relative'>
            <img src={logo} className='h-full p-3 cursor-pointer'/>
        </div>
    </div>

  )
}

export default LowProfileNavbar