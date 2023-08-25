import React from 'react';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

const PhotoPlaceholder = () => {
  return (
    <div
      className='bgc-lightGray rounded-circle d-flex pointer'
      style={{ width: '275px', height: '275px' }}
    >
      <CameraAltOutlinedIcon
        className='mx-auto my-auto'
        sx={{ fontSize: '100px', color: 'white' }}
      />
    </div>
  );
};

export default PhotoPlaceholder;
