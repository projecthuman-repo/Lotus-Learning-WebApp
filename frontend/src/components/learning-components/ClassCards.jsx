import React, { useState } from 'react'
import CustomCheckBox from '../custom-check-box/CustomCheckBox'
import {  RiFile3Line } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { AiFillAudio } from "react-icons/ai";
import { RiGameLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';

const ClassCards = ({data}) => {


  const navigate = useNavigate()
  const [value, setValue] = useState(data.compleated)
  const { courseName } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("watch");

  const checkMediaFile = () =>{
    const type = data.class_media.type;

    switch(type){
      case('video'):
        return <MdOndemandVideo className='text-sm mr-2'/>
      case('audio'):
        return <AiFillAudio className='text-sm mr-2'/>
      case('file'):
        return <RiFile3Line className='text-sm mr-2'/>
      case('game'):
        return <RiGameLine className='text-sm mr-2'/>
      default:
        return <RiFile3Line className='text-sm mr-2'/>

    }
  }

  return (
    <div 
    onClick={() => navigate('/learning/'+courseName+'?watch='+data.id)}
    className={`p-2 px-3 flex items-center justify-between cursor-pointer h-[60px] no-select hover:bg-stone-50 border-r-4 transition-all ${id === data.id? 'border-stone-800 bg-stone-50': 'border-transparent'} `}> 
        <div className='flex items-center'>
          <CustomCheckBox value={value} setValue={setValue}/>
          <p className={` text-sm mx-1 font-medium text-stone-600  ${value && 'line-through'}`}>{data.class_name}</p>
        </div>
        <p className='flex items-center text-xs'>
          {checkMediaFile(data)}
        </p>
    </div>
  )
}

export default ClassCards