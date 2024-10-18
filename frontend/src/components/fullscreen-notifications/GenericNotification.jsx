import React from 'react'
import { IoMdClose } from "react-icons/io";

const GenericNotification = ({setOpen, mainMessage, secondaryMessage=''}) => {
  return (
    <div className='absolute w-full h-full bg-[#0000002c] z-50 flex items-center justify-center'>
        <div className='w-[600px] h-[200px] bg-white rounded-lg p-2 flex flex-col justify-between'>
            <div onClick={() => setOpen(false)} className='cursor-pointer'>
                <IoMdClose/>
            </div>
            <div className='flex items-center justify-center flex-col'>
                <p className='font-semibold text-lg'>{mainMessage}</p>    
                <p className='text-xs'>{secondaryMessage}</p>    
            </div>
            <div className='flex justify-end p-1'>
                <button onClick={() => setOpen(false)} className='font-semibold bg-red-400 text-red-200 hover:scale-[1.05] hover:text-red-100 transition-all px-3 py-1 rounded-full'>Close</button>
            </div>
        </div>
    </div>
  )
}

export default GenericNotification