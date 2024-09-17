import axios from "axios";

const BASE_URL = " http://localhost:5000/ai";
const BASEAPI_URL = "http://34.130.17.89:8080/api";

const getApiToken = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/get-api-token`,
    )
    return res.data.token
  } catch (error) {
    throw new Error("error getting api key");
  }
}

const extractText  = async (formData) => {
  try {
    const response = await fetch( `${BASE_URL}/extract-text`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to upload file');
    }

    return await response.json();
    
} catch (error) {
    console.error('Error:', error);
    document.getElementById('output').textContent = 'Error: ' + error.message;
}
};

// Generate CrossWord
// /get-crossword
const generateCrossword = async (material_id) => {
  try {
    const res = await axios.post(`${BASE_URL}/get-crossword`,{materialId: material_id})
    return res.data.data
  } catch (error) {
    throw new Error("error /get-crossword");
  }
}


// get fill in blanks
const generateFillInBlanks = async (material_id) => {
  try {
    const res = await axios.post(`${BASE_URL}/get-fill-in-blanks`,{materialId: material_id})
    return res.data.data
  } catch (error) {
    throw new Error("error /get-fill-in-blanks");
  }
}

const generateMCQS = async (material_id) => {
  try {
    const res = await axios.post(`${BASE_URL}/get-mcqs`,{materialId: material_id})
    return res.data.data
  } catch (error) {
    throw new Error("error /get-mcqs");
  }
}

const generateWordDef = async (material_id) => {
  try {
    const res = await axios.post(`${BASE_URL}/get-word-def`,{materialId: material_id})
    return res.data.data
  } catch (error) {
    throw new Error("error /get-word-def");
  }
} 

export { extractText,generateCrossword, generateFillInBlanks ,getApiToken , generateMCQS, generateWordDef };
