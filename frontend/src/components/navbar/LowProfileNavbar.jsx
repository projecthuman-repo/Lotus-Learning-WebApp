import React from 'react'
import logo from "../../Images/lotusletters.webp";
import { useNavigate } from 'react-router-dom';

const LowProfileNavbar = () => {
  
  const navigate = useNavigate()
  
  return (
    <div className='w-full h-[4rem]  mb-4 box-shadow bg-white '>
        <div className='max-w-[1450px] mx-auto h-full flex justify-center items-center relative'>
            <img onClick={() => navigate('/')} src={logo} className='h-full p-3 cursor-pointer'/>
        </div>
    </div>

  )
}

export default LowProfileNavbar