import React, { useEffect, useRef, useState } from "react";
import { BsFillVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import { MdOutlineSpeed } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";

import audio from "./testAudio.mp3";

const AudioMedia = () => {
  // Refs to store references to DOM elements
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  // State variables to manage various aspects of the audio player
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [audioSpeed, setAudioSpeed] = useState(1);

  // Function to play/pause audio
  const playAudio = () => {
    const audio = audioRef.current;

    setIsPlaying((prevState) => {
      if (prevState) {
        audio.pause();
      } else {
        audio.play();
      }
      return !prevState;
    });
  };

  // Function to handle the loaded data event of the audio
  const handleLoadedData = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
    setIsLoading(false);
  };

  // Function to handle the time update event of the audio
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const currentTime = audio.currentTime;
    const duration = audio.duration;
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
    const audio = audioRef.current;
    const progress = progressRef.current;
    const clickX = e.clientX - progress.getBoundingClientRect().left;
    const divWidth = progress.clientWidth;
    const percentageClicked = (clickX / divWidth) * 100;
    const seekTime = (percentageClicked / 100) * audio.duration;

    audio.currentTime = seekTime;
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

  // Function to handle volume change
  const handleVolumeChange = (newVolume) => {
    const audio = audioRef.current;
    setVolume(newVolume);
    audio.volume = newVolume;
  };

  // Function to restart the audio
  const reStartAudio = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
  };

  // Function to change playback speed
  const changePlaybackSpeed = (speed) => {
    if (audioRef.current) {
      setAudioSpeed(speed);
      audioRef.current.playbackRate = speed;
    }
  };

  // useEffect to add and remove event listeners for dragging
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
    <div className="w-full relative ">
      {/* Audio player display */}
      <div className=" bg-stone-800 h-[500px] flex items-center justify-center">
        <audio
          onLoadedData={handleLoadedData}
          ref={audioRef}
          controls={false}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={audio} type="audio/mp3" />
          Not supported
        </audio>
        {/* Audio controls and progress bar */}
        <div
          style={{ userSelect: "none" }}
          className="w-[90%]  py-4 mx-auto flex items-center"
        >
          {/* Playback controls */}
          <div className="py-2 flex justify-center items-center text-white ">
            <div className="flex items-end justify-center space-x-9 text-2xl">
              {/* Play/pause button */}
              <div
                onClick={() => playAudio()}
                className="mr-1 text-lg text-stone-100 linearGradient_ver1 w-10 h-10  hover:h-11 hover:w-11 rounded-full cursor-pointer flex items-center justify-center transition-all"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full">
            <div
              ref={progressRef}
              className="w-full h-1 hover:h-2 transition-all mt-1 bg-stone-600 relative cursor-pointer rounded-sm overflow-hidden"
              onMouseDown={(e) => handleMouseDown(e)}
              onMouseMove={(e) => isDragging && handleMouseMove(e)}
              onMouseUp={handleMouseUp}
            >
              <div
                style={{ width: `${progress}%` }}
                className=" linearGradient_ver1 h-full rounded-full"
              ></div>
            </div>
            {/* Volume and time display */}
            <div className="flex items-center justify-between space-x-3 text-white mt-1">
              <div className="flex items-center space-x-1">
                {/* Restart button */}

                {/* Volume control */}
                <div className="cursor-pointer hover:text-stone-300 ">
                  {volume === 0 ? (
                    <BsVolumeMuteFill
                      onClick={() =>
                        volume === 0
                          ? handleVolumeChange(1)
                          : handleVolumeChange(0)
                      }
                    />
                  ) : (
                    <BsFillVolumeUpFill
                      onClick={() =>
                        volume === 0
                          ? handleVolumeChange(1)
                          : handleVolumeChange(0)
                      }
                    />
                  )}
                </div>
                {/* Volume scrollbar */}
                <div
                  className="relative w-16 h-1 bg-stone-500  cursor-pointer"
                  ref={volumeRef}
                  onClick={(e) => {
                    if (!volumeRef.current) return; // Check if the reference is available

                    const progressRect =
                      volumeRef.current.getBoundingClientRect();
                    const clickX = e.clientX - progressRect.left;
                    const divWidth = progressRect.width;

                    // Calculate new volume based on the percentage of click position
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
                  {/* No draggable handle */}
                </div>
              </div>

              {/* Current time and duration display */}
              <div className="flex items-center justify-center space-x-1 pr-1">

                <VscDebugRestart
                  onClick={() => reStartAudio()}
                  className="cursor-pointer hover:text-stone-300"
                />
                {/* Speed control */}
                <div className="text-xl relative hoverParent-small cursor-pointer">
                  <MdOutlineSpeed />
                  <div className="hoverElement-small absolute  speed-container  left-1/2 transform -translate-x-1/2 top-[-130%] w-[200px] h-[30px] bg-stone-800 z-[40] text-xs  items-center justify-between px-2 rounded-sm">
                    <p
                      onClick={() => changePlaybackSpeed(0.25)}
                      className={`${
                        audioSpeed === 0.25 ? "text_linearGradient_ver1 font-semibold" : ""
                      }`}
                    >
                      0.25
                    </p>
                    <p
                      onClick={() => changePlaybackSpeed(0.5)}
                      className={`${
                        audioSpeed === 0.5 ? "text_linearGradient_ver1 font-semibold" : ""
                      }`}
                    >
                      0.5
                    </p>
                    <p
                      onClick={() => changePlaybackSpeed(1)}
                      className={`${
                        audioSpeed === 1 ? "text_linearGradient_ver1 font-semibold" : ""
                      }`}
                    >
                      1
                    </p>
                    <p
                      onClick={() => changePlaybackSpeed(1.5)}
                      className={`${
                        audioSpeed === 1.5 ? "text_linearGradient_ver1 font-semibold" : ""
                      }`}
                    >
                      1.5
                    </p>
                    <p
                      onClick={() => changePlaybackSpeed(1.75)}
                      className={`${
                        audioSpeed === 1.75 ? "text_linearGradient_ver1 font-semibold" : ""
                      }`}
                    >
                      1.75
                    </p>
                  </div>
                </div>
                <p className="text-xs mx-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioMedia;
