import React from 'react'
import './LoadingScreen.css'


const LoadingScreen = () => {
  return (
    <div className='h-[100vh] w-[100vw]  flex items-center justify-center absolute -z-10 top-0 left-0'>
      <div className="page-loader"></div>
    </div>
  )
}

export default LoadingScreen