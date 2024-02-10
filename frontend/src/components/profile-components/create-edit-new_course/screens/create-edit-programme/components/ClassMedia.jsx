import React, { useState } from 'react'
import { BsFillPuzzleFill, BsPersonVideo2 } from 'react-icons/bs'
import { IoDocumentTextSharp } from 'react-icons/io5'
import { MdAudiotrack, MdFileUpload } from 'react-icons/md'

const ClassMedia = ({ setUpdatingMedia, setSelectedFile }) => {
  // State variables
  const [phase, setPhase] = useState(0);
  const [fileType, setFileType] = useState('');
  const [fileAccepted, setFileAccepted] = useState();

  // Function to update the phase and set the file type
  const updatePhase = (type) => {
    setPhase(phase + 1);
    setFileType(type);
    chechAcceptedFile(type);
  };

  // Function to set accepted file types based on the selected type
  const chechAcceptedFile = (type) => {
    switch (type) {
      case 'game':
        setFileAccepted('');
        break;
      case 'file':
        setFileAccepted('.pdf');
        break;
      case 'audio':
        setFileAccepted('audio/*');
        break;
      case 'video':
        setFileAccepted('video/*');
        break;
    }
  };

  // Function to handle file change and update selected file information
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setUpdatingMedia(false);
      setSelectedFile({
        type: fileType,
        file: e.target.result,
        filename: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border p-3">
      {/* Phase 0: Display media type options */}
      {phase === 0 && (
        <div className="flex items-center justify-center space-x-2 min-h-[100px]">
          <div
            onClick={() => updatePhase('game')}
            className="text-stone-50 bg-stone-600 hover:bg-stone-700 p-2 rounded-md flex flex-col items-center justify-center w-[60px]"
          >
            <BsFillPuzzleFill className="text-2xl" />
            <p className="text-xs font-light">Game</p>
          </div>
          <div
            onClick={() => updatePhase('file')}
            className="text-stone-50 bg-stone-600 hover:bg-stone-700 p-2 rounded-md flex flex-col items-center justify-center w-[60px]"
          >
            <IoDocumentTextSharp className="text-2xl" />
            <p className="text-xs font-light">File</p>
          </div>
          <div
            onClick={() => updatePhase('audio')}
            className="text-stone-50 bg-stone-600 hover:bg-stone-700 p-2 rounded-md flex flex-col items-center justify-center w-[60px]"
          >
            <MdAudiotrack className="text-2xl" />
            <p className="text-xs font-light">Audio</p>
          </div>
          <div
            onClick={() => updatePhase('video')}
            className="text-stone-50 bg-stone-600 hover:bg-stone-700 p-2 rounded-md flex flex-col items-center justify-center w-[60px]"
          >
            <BsPersonVideo2 className="text-2xl" />
            <p className="text-xs font-light">Video</p>
          </div>
        </div>
      )}

      {/* Phase 1: Display file upload option */}
      {phase === 1 && (
        <div className="flex items-center justify-center text-stone-700 space-x-2 h-[100px] relative">
          <input
            onChange={handleFileChange}
            type="file"
            style={{ cursor: 'pointer' }}
            className="absolute h-full w-full opacity-0"
            accept={fileAccepted}
          />
          <MdFileUpload className="text-2xl" />
          <p className="font-semibold">Upload {fileType}</p>
        </div>
      )}
    </div>
  );
};

export default ClassMedia;