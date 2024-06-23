import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import { RiGamepadFill } from "react-icons/ri";
import { GrUploadOption } from "react-icons/gr";
import { extractText } from "../../../../BackendProxy/ai_api_connection/ai_api_connection";
import BarLoader from "../../../../components/loaders/BarLoader";
import { BsFillFileTextFill } from "react-icons/bs";
import formatText from "../../../../helpers/transform-api-text/transformApiText";
import PdfDisplayer from "../../../../components/display-pdf/PdfDisplayer";

const MainLessonContent = ({lesson, lessons, updateLessons, index}) => {
  const [phase, setPhase] = useState(1);
  const [fileOption, setFileOption] = useState(null);
  const [fileResponse, setFileResponse] = useState(null)

  const phaseRenderer = (phase) => {
    switch (phase) {
      case 1:
        return <Phase1 updateLesson={updateLessonPropertyAtIndex} setPhase={setPhase} setFileResponse={setFileResponse}/>;
      case 2:
        return <Phase2 lesson={lesson} updateLesson={updateLessonPropertyAtIndex} setPhase={setPhase} setFileOption={setFileOption} />;
      case 3:
        return   <Phase3 setPhase={setPhase} option={lesson.lessonContent.type} fileResponse={lesson.lessonContent.base_content}/>
      default:
        return <div>Nigga</div>;
    }
  };
  const updateLessonPropertyAtIndex = ( property, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [property]: value
    };
    updateLessons(updatedLessons);
  };

  const checkContent = (lesson) => {
    if (!lesson.lessonContent || !lesson.lessonContent.base_content || !lesson.lessonContent.type) {
      return true;
    }
    const { base_content, type } = lesson.lessonContent;
    const isBaseContentEmpty = Object.values(base_content).every(value => value === '');
    const isTypeEmpty = type === '';
    return isBaseContentEmpty && isTypeEmpty;
  };

  useEffect(() => {
    if(checkContent(lesson) && phase === 3){
      setPhase(1)
    }
    console.log(lesson);
  },[lesson])

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="flex items-center justify-between px-3 border-b">
        <div className="py-2 flex items-center cursor-pointer ">
          <input
            className="font-semibold  focus:outline-none focus:bg-stone-50 pl-2 rounded-sm hover:bg-stone-50 "
            placeholder="Lesson title"
            onChange={(e) => {updateLessonPropertyAtIndex('title', e.target.value)}}
            value={lesson.title}
          />
          <FiEdit2 className="mx-2 text-stone-400" />
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-2 linearGradient_ver1 rounded-full hover:scale-[1.01] transition-all">
            <span className="text-white text-sm ">Save</span>
            <BsCheck className="ml-1 text-white" />
          </button>
          <button className="flex items-center px-2 bg-stone-50 rounded-full hover:scale-[1.01] transition-all">
            <span className="text-sm font-semibold">Discard</span>
            <IoClose className="ml-1" />
          </button>
        </div>
      </div>
      {checkContent(lesson)? 
      phaseRenderer(phase)
      :
      <Phase3 setPhase={setPhase} option={lesson.lessonContent.type} fileResponse={lesson.lessonContent.base_content}/>
      }
      <div className="p-3">
        <label htmlFor="lesson-description" className="font-semibold text-lg flex items-center cursor-pointer">
          <span>
          Description
          </span>
        <FiEdit2 className="mx-2 text-stone-400" />
        </label>
        <textarea 
        id="lesson-description"
        onChange={(e) => {updateLessonPropertyAtIndex('description', e.target.value)}}
        value={lesson.description}
        className="w-full p-2 text-sm focus:outline-none focus:border" placeholder="Add a description for your lesson"/>
      </div>

    </div>
  );
};

const Phase1 = ({ setPhase, setFileResponse, updateLesson }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const toggle = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("pdf", file);
    setLoading(true);
    try {
      const response = await extractText(formData);
      setPhase(2);
      setFileResponse(response.data)
      updateLesson('lessonContent',{'base_content':{'material_id': response.data.material_id,
                'text': response.data.text}})
      console.log(response);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
    //   const formattedText = formatText(response.data.text);
    //   setOutput('Error: ' + error.message);
  };
  return (
    <div className="h-[200px] w-full flex items-center justify-center bg-stone-50 relative ">
      <form onSubmit={toggle}>
        {file ? (
          <div>
            {loading ? (
              <>
                <BarLoader />
              </>
            ) : (
              <>
                <p className="text-center mb-3 font-semibold">{file.name}</p>
                <div className="flex items-center space-x-4">
                  <button
                    className="linearGradient_ver1 flex items-center font-semibold px-4 text-white rounded-full hover:scale-[1.01] transition-all"
                    type="submit"
                  >
                    <spam>Submit</spam>
                    <BsCheck className="ml-1" />
                  </button>
                  <button
                    className=" flex items-center font-semibold px-4 bg-stone-100 rounded-full hover:scale-[1.01] transition-all"
                    onClick={() => {
                      setFile(null);
                    }}
                  >
                    <span>Change File</span>
                    <IoClose className="ml-1" />
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center text-xl font-semibold">
              <p>Upload File</p>
              <GrUploadOption className="ml-2" />
            </div>
            <input
              className="absolute opacity-0 top-0 left-0 w-full h-full full cursor-pointer"
              type="file"
              id="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </>
        )}
      </form>
    </div>
  );
};

const Phase2 = ({ updateLesson, setPhase, setFileOption, lesson }) => {
  const handleOptionSelection = (option) => {
    updateLesson('lessonContent', {'type': option, ...lesson.lessonContent})
    setFileOption(option);
    setPhase(3);
  };

  return (
    <div className="h-[250px] w-full flex flex-col items-center justify-center bg-stone-50 relative ">
      <p className="mb-2 text-lg font-semibold text-center">
        Your file is ready! What is its purpose?
      </p>
      <div className="flex items-center justify-center h-[170px] space-x-3">
        <div
          onClick={() => {
            handleOptionSelection("game");
          }}
          className={`h-full w-[200px] bg-green-400 rounded-lg flex flex-col items-center justify-center 
                    hover:scale-[1.01] transition-all cursor-pointer`}
        >
          <div className="bg-green-500 p-3 rounded-full">
            <RiGamepadFill className="text-3xl text-green-50" />
          </div>
          <p className="text-green-50 font-semibold mt-1">Generate a game</p>
        </div>
        <div
          onClick={() => {
            handleOptionSelection("text");
          }}
          className={`h-full w-[200px] bg-blue-400 rounded-lg flex flex-col items-center justify-center
                    hover:scale-[1.01] transition-all cursor-pointer`}
        >
          <div className="bg-blue-500 p-3 rounded-full">
            <BsFillFileTextFill className="text-3xl text-blue-50" />
          </div>
          <p className="text-blue-50 font-semibold mt-1">Keep it as text</p>
        </div>
      </div>
    </div>
  );
};

const Phase3 = ({ setPhase, option, fileResponse }) => {
  
 
  return <>{(option === "text") ? 
  <div className="border-b">
  <PdfDisplayer text={fileResponse.text}/>
  </div> 
  :
  <>
  </>
  }</>;
};

export default MainLessonContent;
