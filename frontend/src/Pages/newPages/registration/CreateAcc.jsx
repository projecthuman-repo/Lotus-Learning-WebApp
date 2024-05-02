import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import BlobComposition from '../../../components/backgrounds/BlobComposition/BlobComposition'
import { HiAcademicCap } from "react-icons/hi";
import { HiBriefcase } from "react-icons/hi";
import { HiLibrary } from "react-icons/hi";

import './registration.css'
import SignUp from './SignUp';
const CreateAcc = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const phase = urlParams.get("phase");
    const navigate = useNavigate()

    useEffect(() => {
        if(!phase){
            navigate('/registration?screen=signup&phase=1')
        }
    },[phase])

  return (
    <div className='mb-4  bg-white shadow-md rounded-lg'>
        <BlobComposition
        blobsData={[
          { top: "10%", left: "-20%", size: "700px" },
          { top: "-30%", left: "70%", size: "700px" },
        ]}
      />
      {phase == 1 && <Phase1/>}
      {phase == 2 && <Phase2/>}
        
    </div>
  )
}

const Phase1 = () => {
    const navigate = useNavigate();

    const gotTo = (nav) => {
        navigate('/registration?screen=signup&phase=2&type='+nav)
    }

    return(
        <div className='flex flex-col items-center justify-center p-3 w-[400px]'>
        <p className='font-semibold text-lg'>Choose your account type</p>
        <div className='mt-3 flex flex-col space-y-3 w-full'>
            <button 
            onClick={() => gotTo('student')}
            className='border w-full py-2 rounded-lg flex items-center text-stone-700 hover:bg-black  hover:text-white transition-all'>
                <div className=' ml-2'>
                <HiAcademicCap className='text-xl '/>
                </div>
                <p className=' font-medium  w-full text-center'>Student</p>
            </button>
            <button 
            onClick={() => gotTo('instructor')}
            className='border w-full py-2 rounded-lg flex items-center text-stone-700 hover:bg-black  hover:text-white transition-all'>
                <div className=' ml-2'>
                <HiBriefcase className='text-xl'/>
                </div>
                <p className=' font-medium  w-full text-center'>Teacher</p>
            </button>
            <button 
            onClick={() => navigate('/registration?screen=admin&phase=1')}
            className='border w-full py-2 rounded-lg flex items-center text-stone-700 hover:bg-black  hover:text-white transition-all'>
                <div className=' ml-2'>
                <HiLibrary className='text-xl'/>
                </div>
                <p className=' font-medium  w-full text-center'>Institution</p>
            </button>
            
        </div>
        <p onClick={() => navigate('/registration')} className='mt-1 text-sm cursor-pointer'>I have an account <span className="hover:underline font-medium"> Login </span></p>
      </div>
    )
}
const Phase2 = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");
    const navigate = useNavigate();

    useEffect(() => {
        if(!type){
            navigate('/registration?screen=signup&phase=1')
        }
    },[type])
    return (
        <div className='flex flex-col items-center justify-center p-3 '>
            <SignUp type={type}/>

        </div>
    )
}

export default CreateAcc