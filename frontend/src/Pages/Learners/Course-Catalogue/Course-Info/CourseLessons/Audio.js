import React from 'react';

function Audio() {
  const redirectToAnotherPage = () => {
    window.location.href = '/Completed';
  };

  return (
    <div className='d-flex flex-column vh-80'>
      <div className='container'>
        <div className='d-flex align-items-center'>
          <h2 className='mt-5'>Audio Lecture</h2>
        </div>

        <p className='lead'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo
          est. Ut sit amet turpis accumsan, faucibus eros sed, tempus est. Morbi
          dapibus felis vitae mi ornare dapibus. Curabitur vitae consectetur
          libero, a feugiat ante. Mauris blandit dui interdum lorem pharetra
          accumsan. Pellentesque efficitur ipsum et tortor porttitor viverra
        </p>
      </div>
      <br></br>
      <div
        className='container bg-light p-4 mt-auto rounded-lg d-flex align-items-start mt-2'
        style={{ overflowX: 'hidden' }}
      >
        <img
          src='https://img.icons8.com/?size=512&id=60449&format=png'
          width='50'
          height='50'
          alt='Video Icon'
          style={{ marginRight: '10px' }}
        />
        <h3>Title of Subject</h3>
      </div>
      <br></br>
      <br></br>

      <div
        className='container bg-light p-4 rounded-lg mt-2'
        style={{ overflowX: 'hidden' }}
      >
        <h4>Transcript:</h4>
        <p>
          "There are words mentioned in the audio clip/lecture. This is a great
          way for when you just want to read a transcript or if you are in an
          area where you cannot listen to the lecture but would like to know the
          contents of it""
        </p>
      </div>
      <div className='container mt-3 d-flex justify-content-between'>
        <div className='d-flex ml-auto'>{/* You can add content here */}</div>

        <button className='btn btn-secondary' onClick={redirectToAnotherPage}>
          Done
        </button>
      </div>
    </div>
  );
}

export default Audio;
