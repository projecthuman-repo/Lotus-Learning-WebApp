import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import logoText from "../../../Images/lotusletters.webp";
import { IoMdBookmarks } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { MdAccountTree } from "react-icons/md";

const User = () => {
    const { screen } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if(!screen){
            navigate('/user/courses')
        }
    },[screen])

    const checkScreen = (screen, option) => {
        return (screen === option)
    }

    return (
    <div className='h-full w-full flex'>
        <div className='w-[350px] h-full border-r flex flex-col items-start justify-between p-4 bg-stone-700'>
            <div className='w-full '>
                <div className='mt-2 mb-4 flex items-center justify-center cursor-pointer no-select'>
                    <img className='h-[30px]' src={logoText}/>
                </div>
                <div className='mt-1 mb-3 flex items-center justify-start w-full cursor-default'>
                    <img className='rounded-full h-[70px] w-[70px] no-select' src='data:image/jpeg;base64,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'/>
                    <div className='ml-2 flex flex-col'>
                        <p className='font-semibold text-stone-50 w-full break-all'>dsoikoisdfaj</p>
                        <p className='text-sm text-stone-50 w-full'>dsoikoisdfaj</p>
                    </div>
                </div>
                <div className='w-full flex flex-col space-y-3 no-select'>
                    <button className={`my-2 flex items-center text-stone-400 font-medium  text-left  py-1 border-l-2 hover:bg-stone-50 hover:text-stone-900  ${checkScreen(screen, 'courses') ? 'pl-5 bg-stone-50 text-stone-900' : 'pl-3 hover:pl-5 hover:border-l-4'} transition-all`}>
                        <IoMdBookmarks className='mr-2'/>
                        Courses
                    </button>
                    <button className={`my-2 flex items-center text-stone-400 font-medium  text-left  py-1 border-l-2 hover:bg-stone-50 hover:text-stone-900  ${checkScreen(screen, 'explore') ? 'pl-5 bg-stone-50 text-stone-900' : 'pl-3 hover:pl-5 hover:border-l-4'} transition-all`}>
                        <IoSearchSharp className='mr-2'/>
                        Explore
                    </button>
                    <button className={`my-2 flex items-center text-stone-400 font-medium  text-left  py-1 border-l-2 hover:bg-stone-50 hover:text-stone-900  ${checkScreen(screen, 'notifications') ? 'pl-5 bg-stone-50 text-stone-900' : 'pl-3 hover:pl-5 hover:border-l-4'} transition-all`}>
                        <IoMdNotifications className='mr-2'/>
                        Notifications
                    </button>
                    <button className={`my-2 flex items-center text-stone-400 font-medium  text-left  py-1 border-l-2 hover:bg-stone-50 hover:text-stone-900  ${checkScreen(screen, 'settings') ? 'pl-5 bg-stone-50 text-stone-900' : 'pl-3 hover:pl-5 hover:border-l-4'} transition-all`}>
                        <IoIosSettings className='mr-2'/>
                        Settings
                    </button>
                </div>
            </div>
            <div className='w-full flex items-end justify-between'>
                <p className='text-xs text-stone-300 cursor-default flex items-center'>
                    <MdAccountTree className='mr-1'/>
                    <p>Student</p>
                </p>
                <button className='font-semibold flex items-center text-stone-600 hover:text-stone-300 transition-all'>
                    <FaPowerOff className='mr-2'/>
                    Logout
                </button>
            </div>
        </div>
        <div className='w-full h-[100vh] bg-white'>

        </div>
    </div>
  )
}

export default User