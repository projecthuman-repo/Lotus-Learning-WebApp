import React, { useEffect, useState } from "react";
import GeneralNavbar from "../../../components/navbar/GeneralNavbar";
import GeneralFooter from "../../../components/footer/GeneralFooter";
import LearningNavbar from "../../../components/navbar/LearningNavbar";
import { IoArrowBack } from "react-icons/io5";
import ClassCards from "../../../components/learning-components/ClassCards";
import TextFileMedia from "../../../components/learning-components/course-media-components/TextFileMedia";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import BluredText from "../../../components/blured-text/BluredText";
import VideoMedia from "../../../components/learning-components/course-media-components/VideoMedia";
import AudioMedia from "../../../components/learning-components/course-media-components/AudioMedia";
import { useNavigate, useParams } from "react-router-dom";
import audio from "../../../components/learning-components/course-media-components/testAudio.mp3"
import video from "../../../components/learning-components/course-media-components/testVideo.mp4"
import pdf from "../../../components/learning-components/course-media-components/testPdf.pdf"
import PdfInterpreter from "../../../components/pdf/Pdf-interpreter";


const Learning = () => {

  const { courseName } = useParams();
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("watch");
  // expected { classData, index };
  const [currentClass, setCurrentClass] = useState(null);
  const [openSideMenu, setOpenSideMenu] = useState(true);


  const testClassData = [
    {
      id: 'AAAA',
      class_name: 'Algebra I',
      class_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      class_media: {
        type: 'video',
        media: video
      },
      compleated: true,
    },
    {
      id: 'AAAB',
      class_name: 'Algebra II',
      class_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      class_media: {
        type: 'audio',
        media: audio
      },
      compleated: false,
    },
    {
      id: 'AABB',
      class_name: 'Algebra III',
      class_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      class_media: {
        type: 'file',
        media: pdf
      },
            compleated: false,
    },
  ]

  useEffect(() =>{

    if(!courseName){
      navigate("/")
    }
    setCurrentClass(checkCurrentClass(id, testClassData))
  },[courseName, id])

  const checkCurrentClass = (id, classes) => {
    const search = (array, id) => {
      const index = array.findIndex(obj => obj.id === id);
      const classData = array.find(obj => obj.id === id);
      return { classData, index };
    };
      return search(classes, id);
  }
 
  const currenCourse = () => {

    const media = currentClass.classData.class_media.file
    const type = currentClass.classData.class_media.type

    switch(type){
      case('video'):
        return <VideoMedia media={media}/>
      case('audio'):
        return <AudioMedia media={media}/>
      case('file'):
        return <PdfInterpreter media={media}/>
      case('game'):
        return <VideoMedia media={media}/>
      default:
        return <VideoMedia media={media}/>

    }
  }

  const nextClass = () => {
    if(testClassData[currentClass.index+1]){
      navigate('/learning/'+courseName+'?watch='+testClassData[currentClass.index+1].id)
    }return
  }
  const prevClass = () => {
    if(testClassData[currentClass.index-1]){
      navigate('/learning/'+courseName+'?watch='+testClassData[currentClass.index-1].id)
    }return
  }

  return (
    <div>
      {/* SEND COURSE DATA TO THE NAVBAR AFTER THE FETCH */}
      <LearningNavbar />
      <div className=" flex relative ">
        <div
          className={` h-full  ${
            openSideMenu ? "md:relative fixed left-0" : " absolute -left-[100%]"
          } lg:w-[30vw] md:w-[45vw] w-[70vw] top-0 z-[1000] bg-white transition-all`}

        >
          <div className="flex justify-between items-center py-2 px-3">
            <p className="font-semibold text_linearGradient_ver1   ">
              Course Content{" "}
            </p>
            <div
              onClick={() => setOpenSideMenu(false)}
              className="p-2 hover:bg-stone-100 cursor-pointer rounded-full"
            >
              <IoArrowBack />
            </div>
          </div>
          {/* Course Conten */}
          <div>
            {testClassData && testClassData.map((item, id) => {
              return (
                <div key={id+item.id}>
                    <ClassCards data={item}/>
                </div>
              )
            })}
          </div>
        </div>
        <div className={`${openSideMenu? 'border-l' : ''} w-full`}>
          {!openSideMenu && (
            <div
              onClick={() => setOpenSideMenu(true)}
              className=" top-10 font-bold pr-3 pl-3 py-2 border cursor-pointer hover:pl-5 transition-all absolute z-30  bg-stone-700" 
            >
              <p className="text_linearGradient_ver1">
                Course Content {">>"}{" "}
              </p>
            </div>
          )}
          <div className="w-full  bg-white no-select h-auto">
            {currentClass && currenCourse()}
          </div>
          <div className="w-full h-[45vh] sm:h-auto bg-stone-700">
            <div className="p-3 w-full border-b border-stone-600 flex justify-between items-center">
              <p className="font-semibold text-white">Class Name</p>
              <div className="flex space-x-2">
                <button onClick={() => prevClass()} className="cursor-pointer text-white">
                  <IoArrowBackOutline />
                </button>
                <button onClick={() => nextClass()} className="cursor-pointer text-white">
                  <IoMdArrowForward />
                </button>
              </div>
            </div>
            <div className="p-3 w-full h-full  border-white">
              <p className="font-semibold text-lg text-white">
                About the class
              </p>
              <div className="text-xs font-light text-white mt-2">
                <BluredText
                  text="
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Excepturi ipsam dolorum quidem aperiam quod exercitationem quia
                                consequuntur, harum veniam quam aliquam repudiandae neque
                                molestias expedita non nisi ea iusto placeat. Lorem ipsum, dolor
                                sit amet consectetur adipisicing elit. Doloribus nobis optio
                                aliquam eveniet commodi praesentium molestiae dicta voluptatum.
                                Ipsum provident necessitatibus, impedit doloremque nemo minus
                                ducimus aliquid in doloribus magnam."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default Learning;
