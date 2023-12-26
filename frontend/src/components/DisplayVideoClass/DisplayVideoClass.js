import React, { useState, useRef, useEffect } from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { CgMaximizeAlt } from "react-icons/cg";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { MdOutlineSpeed } from "react-icons/md";


import "./DisplayVideoClass.css";

const DisplayVideoClass = ({ video }) => {
  // State variables to manage video playback and loading
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [videoSpeed, setVideoSpeed] = useState(1)

  // Refs for accessing video and progress bar elements
  const videoRef = useRef(null);
  const parentDivRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  // Function to toggle play/pause state of the video
  const togglePlay = () => {
    const video = videoRef.current;
    setIsPlaying((prevState) => {
      if (prevState) {
        video.pause();
      } else {
        video.play();
      }
      return !prevState;
    });
  };

  // Function to handle the loaded data event of the video
  const handleLoadedData = () => {
    const video = videoRef.current;
    setDuration(video.duration);
    setIsLoading(false);
  };

  // Function to handle the time update event of the video
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const currentTime = video.currentTime;
    const duration = video.duration;
    const calculatedProgress = (currentTime / duration) * 100;
    setProgress(calculatedProgress);
    setCurrentTime(currentTime);
  };

  // Function to handle mouse down event on the progress bar
  const handleMouseDown = (e) => {
    moveProgressBar(e);
    setIsDragging(true);
  };

  // Function to handle mouse move event on the progress bar
  const handleMouseMove = (e) => {
    if (isDragging) {
      moveProgressBar(e);
    }
  };

  // Function to handle mouse up event on the progress bar
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Function to calculate and set the new progress based on mouse position
  const moveProgressBar = (e) => {
    const video = videoRef.current;
    const progress = progressRef.current;
    const clickX = e.clientX - progress.getBoundingClientRect().left;
    const divWidth = progress.clientWidth;
    const percentageClicked = (clickX / divWidth) * 100;
    const seekTime = (percentageClicked / 100) * video.duration;

    video.currentTime = seekTime;
    setProgress(percentageClicked);
  };

  // Function to format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const toggleFullScreen = () => {
    const parentDiv = parentDivRef.current;

    if (!isFullScreen) {
      if (parentDiv.requestFullscreen) {
        parentDiv.requestFullscreen();
      } else if (parentDiv.mozRequestFullScreen) {
        parentDiv.mozRequestFullScreen();
      } else if (parentDiv.webkitRequestFullscreen) {
        parentDiv.webkitRequestFullscreen();
      } else if (parentDiv.msRequestFullscreen) {
        parentDiv.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  // Function to handle volume change
  const handleVolumeChange = (newVolume) => {
    const video = videoRef.current;
    setVolume(newVolume);
    video.volume = newVolume;
  };

  //Function to handle video Speed
  const changePlaybackSpeed = (speed) => {
    if (videoRef.current) {
      setVideoSpeed(speed)
      videoRef.current.playbackRate = speed;
    }
  };


  // Effect to add and remove mouse move and mouse up event listeners based on isDragging state
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full border-b">
      <div ref={parentDivRef} className="bg-stone-800 relative md:h-[500px] h-[250px]  hoverParentOppacity">
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaSpinner className="text-white text-4xl animate-spin" />
          </div>
        )}
        {/* Video element */}
        <video
          ref={videoRef}
          className={`h-full w-full mx-auto ${
            isLoading ? "hidden" : "block"
          } class-video`}
          controls={false}
          autoPlay={false}
          loop={false}
          muted={false}
          onClick={togglePlay}
          onLoadedData={handleLoadedData}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={video} type="video/mp4" />
          Not Supported
        </video>
        {/* Progress bar and playback controls */}
        <div
          style={{ userSelect: "none" }}
          className="hoverElementOppacity absolute w-full bottom-0 h-[50px] bg-transparent z-10 flex items-center justify-start"
        >
          {/* Progress bar */}
          <div
            ref={progressRef}
            className={`bg-[#4f4f4f71] h-1 hover:h-2 w-full absolute top-0 left-0 cursor-pointer z-20  transition-all ${
              isDragging ? "pointer-events-none" : "pointer-events-auto"
            }`}
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseMove={(e) => isDragging && handleMouseMove(e)}
            onMouseUp={handleMouseUp}
          >
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-white"
            ></div>
          </div>
          {/* Playback controls and time display */}
          <div className="text-white text-sm  flex items-center justify-between  w-full pt-1">
            <div className=" space-x-2 flex items-center justify-center">
              <div
                className="ml-2 text-2xl cursor-pointer"
                onClick={togglePlay}
              >
                {isPlaying ? <IoMdPause /> : <IoMdPlay />}
              </div>
              <p>
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>
            <div className="text-xl pr-3 flex space-x-3 items-center">
              <div className="text-xl relative hoverParent-small cursor-pointer">
                <MdOutlineSpeed />
                <div className="hoverElement-small absolute  speed-container  left-1/2 transform -translate-x-1/2 top-[-130%] w-[200px] h-[30px] bg-stone-800 z-[40] text-xs  items-center justify-between px-2 rounded-sm">
                    <p onClick={() => changePlaybackSpeed(0.25)} className={`${(videoSpeed === 0.25)?'text-blue-400 font-semibold' : '' }`}>0.25</p>
                    <p onClick={() => changePlaybackSpeed(0.5)} className={`${(videoSpeed === 0.5)?'text-blue-400 font-semibold' : '' } `}>0.5</p>
                    <p onClick={() => changePlaybackSpeed(1)} className={`${(videoSpeed === 1)?'text-blue-400 font-semibold' : '' }`}>1</p>
                    <p onClick={() => changePlaybackSpeed(1.5)} className={`${(videoSpeed === 1.5)?'text-blue-400 font-semibold' : '' }`}>1.5</p>
                    <p onClick={() => changePlaybackSpeed(1.75)}className={`${(videoSpeed === 1.75)?'text-blue-400 font-semibold' : '' }`}>1.75</p>
                </div>
              </div>

              <div className="cursor-pointer hover:text-stone-300">
                <BsFillVolumeUpFill
                  onClick={() =>
                    volume === 0 ? handleVolumeChange(1) : handleVolumeChange(0)
                  }
                />
              </div>
              {/* Volume scrollbar */}
              <div
                className="relative w-16 h-1 bg-stone-500  cursor-pointer"
                ref={volumeRef}
                onClick={(e) => {
                  if (!volumeRef.current) return; // Verificar si la referencia está disponible

                  const progressRect =
                    volumeRef.current.getBoundingClientRect();
                  const clickX = e.clientX - progressRect.left;
                  const divWidth = progressRect.width;

                  // Calcular el nuevo volumen basado en el porcentaje de la posición del clic
                  const percentageClicked = (clickX / divWidth) * 100;
                  const newVolume = Math.min(
                    1,
                    Math.max(0, percentageClicked / 100)
                  );
                  handleVolumeChange(newVolume);
                }}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-stone-300 rounded-lg"
                  style={{ width: `${volume * 100}%` }}
                ></div>
                {/* No hay asa arrastrable */}
              </div>

              <div
                className="cursor-pointer hover:text-stone-300"
                onClick={toggleFullScreen}
              >
                <CgMaximizeAlt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayVideoClass;
