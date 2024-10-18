import React, { useState } from 'react';
import { extractText, getApiToken } from './BackendProxy/ai_api_connection/ai_api_connection';
import formatText from './helpers/transform-api-text/transformApiText';

const TestPlayGround = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };



  const toggle = async (event) => {
    event.preventDefault();

    if (!file) {
      setOutput('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await extractText(formData);
      console.log(response);
      const formattedText = formatText(response.data.text);
      setOutput(formattedText);
    } catch (error) {
      console.error('Error extracting text:', error);
      setOutput('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Upload PDF and Extract Text</h1>
      <form onSubmit={toggle}>
        <label htmlFor="pdf">Select PDF:</label>
        <input type="file" id="pdf" accept=".pdf" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
      <div id="output" style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '10px', border: '1px solid #ccc', marginTop: '20px' }} dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  );
};

export default TestPlayGround;
