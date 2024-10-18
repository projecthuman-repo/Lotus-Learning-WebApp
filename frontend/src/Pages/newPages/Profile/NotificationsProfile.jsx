import React from 'react'
import { FaSortAlphaDownAlt } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { MdOpenInNew  } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import OnHoverExtraHud from '../../../components/OnHoverExtraHud';

const NotificationsProfile = () => {
  return (
    <>
        <div className='bg-white rounded-full flex justify-between items-center py-2 px-4'>
            <p className='font-semibold text-lg'>Notifications</p>
            <div className="flex items-center space-x-3 bg-red-400 w-[30px] h-[30px] justify-center rounded-full">
                <p className='text-lg font-semibold text-white'>3</p>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-3 space-y-2'>
            <NotificationBar/>
            <NotificationBar/>
            <NotificationBar/>


        </div>

    </>
  )
}

const NotificationBar = () =>{
    return (
        <div className='bg-white rounded-full flex justify-between items-center py-2 px-4 w-full relative'>
        <div className='absolute top-1 left-[1%] h-[10px] w-[10px] bg-red-400 rounded-full'></div>
        <div>
            <p className='font-medium'>Notification Message</p>
            <p className='text-sm '>Notification descrition</p>
        </div>
        <div className='flex space-x-2'>
            <div className='cursor-pointer hover-parent'>
                <OnHoverExtraHud name="Go"/>
                <MdOpenInNew/>
            </div>
            <div className='cursor-pointer hover-parent'>
                <OnHoverExtraHud name="Delete"/>
                <MdOutlineClose/>

            </div>
        </div>
    </div>
    )
}

export default NotificationsProfile