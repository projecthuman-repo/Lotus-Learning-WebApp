import React from 'react'

const NotificationsDropDown = () => {
  return (
    <div className='w-[200px] border rounded-sm bg-white'>
        <div className='p-2 border-b'>
            <p className='text-sm text-stone-500'>Notifications</p>
        </div>
        <div className=''>
            <div className='h-full w-full flex items-center justify-center'>
                <p className='text-xs py-3'>No notifications yet</p>
            </div>
        </div>
    </div>
  )
}

export default NotificationsDropDown