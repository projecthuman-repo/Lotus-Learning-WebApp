import React from 'react'
import { IoReturnDownBackSharp, IoAdd  } from "react-icons/io5";
import OnHoverExtraHud from '../../../../components/OnHoverExtraHud';

const LessonsList = ({lessons, updateLessons, setSelectedLesson}) => {

    const newObjetTemp = {
        attachedFile: '',
        description: '',
        extraActivities: [],
        filename: '',
        title: 'Title',
        type: '',
        lessonContent: {
            base_content: {
                material_id: '',
                text: ''
            },
            type: '',
            media: ''
        }
    }

    const handleAddNewLesson = () => {
        updateLessons([...lessons, newObjetTemp])
    }

  return (
    <div className='w-[450px] cursor-default no-select'>
        <div className='px-2 w-full border-r'>
            <p className='font-ligth text-sm py-1 text-stone-400'>Editing mode</p>
        </div>
        <div className='w-full h-[2rem] border-r flex items-center justify-between px-2'>
            <div onClick={() => handleAddNewLesson()} className=' cursor-pointer font-semibold px-3 rounded-full py-1 text-white linearGradient_ver1 flex items-center  hover:scale-[1.02] transition-all '>
                <p className='text-sm'>Add Lesson</p>
                <IoAdd className='ml-2'/>
            </div>
            <div className='flex items-center hover-parent cursor-pointer bg-stone-100 px-2 text-lg hover:scale-[1.08] transition-all rounded-full'>
                <IoReturnDownBackSharp/>
                <p className='text-xs ml-2 font-semibold'>return</p>

            </div>

        </div>
        <div  className='w-full h-[calc(100vh-4rem)] overflow-y-auto border-r  relative no-select border-t'>
        {lessons.map((item, i) =>{
            return(
                <div key={item._id} onClick={() => setSelectedLesson(i)}>
                <LessonItem lesson={item} i={i} />
                </div>
            )
        })}
        
        </div>
    </div>

  )
}

const LessonItem = ({lesson, i}) => {
    return(
        <div  className='w-full h-[4rem] mb-[0.1rem] flex items-center justify-start px-3 border-b font-semibold cursor-pointer hover:bg-stone-50 transition-all'>
            <p className='text-stone-700'>
             {i+1}.   {lesson.title}
            </p>
        </div>
    )
}


export default LessonsList