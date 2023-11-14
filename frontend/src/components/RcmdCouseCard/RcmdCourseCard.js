import React from 'react'

const RcmdCourseCard = ({img, text}) => {
  return (
    <div className='lg:h-[340px] lg:w-[290px] h-[320px] w-[240px] m-1 border-2 border-zinc-300 rounded-md flex flex-col overflow-hidden'>
        <div className='h-[65%] w-full '>
            <img src={img} className='h-full w-full object-cover' alt="course-img"/>
        </div>
        <div className='h-[45%] w-full p-3 flex flex-col items-start'>
            <p  style={{letterSpacing: ".03rem"}} className='font-medium text-md cursor-pointer'>Course Name</p>
            <p className='underline cursor-pointer text-sm hover:text-blue-700 '>author name</p>
            <div>
                <p className='text-xs mt-1'>
                    <TruncatedText  text={text}/>
                </p>
            </div>
            <div className='mt-[0.1rem] h-[40%] flex flex-wrap overflow-hidden items-center justify-start'>
                <CoursePins name={'pin-A'}/>
                <CoursePins name={'pin-A43454434'}/>
                <CoursePins name={'pin-A'}/>
                <CoursePins name={'pin-A'}/>
            </div>
        </div>
    </div>
  )
}

const  TruncatedText = ({ text, maxWords = 5 }) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(' ') + '...';
  
      return <p>{truncatedText}</p>;
    }
    return <p>{text}</p>;
  }

const CoursePins = ({name}) =>{
    
    return (
        <div className='bg-zinc-300 h-[20px] flex items-center justify-center rounded-full mb-1 mx-[0.05rem]'>
            <p className='text-xs px-2 font-semibold text-zinc-800'>
                {name}
            </p>    
        </div>
    )
}

export default RcmdCourseCard