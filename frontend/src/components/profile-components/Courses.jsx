import React from 'react'
import { IoIosSearch } from "react-icons/io";

import styles from '../../Styles';
import OnProgressCourses from './OnProgressCourses';
import GeneralFooter from '../footer/GeneralFooter';

const Courses = () => {
  return (
    <div className='w-full min-h-[70vh] p-2'>
        <div className={`flex items-center justify-between mb-2`}>
            <div>
                <p className='font-semibold text-stone-600'>
                    On progress courses
                </p>
            </div>
            <div className={`flex items-center justify-between w-[250px] ${styles.simple_text_input} bg-white`}>
                <input type="text" placeholder='Serch Course' className='w-full focus:outline-none text-sm'/>
                <IoIosSearch className='ml-2'/>
            </div>
        </div>
        <div className='grid md:gap-1 gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
            <OnProgressCourses/>
            <OnProgressCourses/>
            <OnProgressCourses/>
            <OnProgressCourses/>
            <OnProgressCourses/>
            <OnProgressCourses/>
            <OnProgressCourses/>
            <OnProgressCourses/>
            <OnProgressCourses/>
            <OnProgressCourses/>
        </div>
    </div>
  )
}

export default Courses