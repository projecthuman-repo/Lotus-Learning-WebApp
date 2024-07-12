import React, { useState } from 'react';
import { extractText } from './BackendProxy/ai_api_connection/ai_api_connection';

const TestPlayGround = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const toggle = () => {
    if (file) {
      extractText(file);
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={toggle}>Upload</button>
    </div>
  );
};

export default TestPlayGround;
