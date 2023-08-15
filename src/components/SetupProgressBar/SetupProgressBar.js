import React from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { ProgressBar } from 'react-bootstrap';
import './setupProgressBar.css';

const SetupProgressBar = ({ step, setCurrentStep }) => {
  const Checkmark = () => {
    return <IoCheckmarkSharp color='black' />;
  };
  const onCircleClick = (stepClicked) => {
    if (stepClicked < step) {
      setCurrentStep(stepClicked);
    }
  };
  return (
    <>
      <div className='d-flex justify-content-center'>
        <div
          className={
            step === 1
              ? 'progress-circle-current text-center pointer'
              : 'progress-circle-noncurrent text-center pointer'
          }
          onClick={() => onCircleClick(1)}
        ></div>
        <div className='progress-line' />
        <div
          className={
            step === 2
              ? 'progress-circle-current text-center pointer'
              : 'progress-circle-noncurrent text-center pointer'
          }
          onClick={() => onCircleClick(2)}
        ></div>
        <div className='progress-line' />
        <div
          className={
            step === 3
              ? 'progress-circle-current text-center pointer'
              : 'progress-circle-noncurrent text-center pointer'
          }
          onClick={() => onCircleClick(3)}
          // className='progress-circle-unfinished'
        ></div>
      </div>
      <div className='d-flex justify-content-center text-center text-nowrap mx-sm-5 mt-2'>
        <div>
          <p className='fs-14'>Create Profile</p>
        </div>

        <div className='progress-gap' />
        <div>
          <p className='fs-14'>Terms and Conditions</p>
        </div>

        <div className='progress-gap' />
        <div>
          <p className='fs-14'>Complete</p>
        </div>
      </div>
    </>
  );
};

export default SetupProgressBar;
