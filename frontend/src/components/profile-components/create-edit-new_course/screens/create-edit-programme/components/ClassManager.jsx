import React, { useState } from 'react'

const ClassManager = ({classData}) => {
    
    const [opened, setOpened] = useState(false)
    
    console.log(classData);

    return (
    <div style={{ userSelect: "none" }} className=' cursor-pointer '>
        <div className='w-full h-[4rem] flex items-center justify-start px-3'>
           <p className=''>
            {classData.title}
            </p> 
        </div>
    </div>
  )
}

export default ClassManager