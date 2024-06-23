import axios from "axios";

const BASE_URL = "http://localhost:5000/ai";
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

const extractTextLocal = async(token) => {
  try {
    const extractText = await axios.post(
      BASEAPI_URL + "/document/extract-text",
      {
        "document": '',
      },
      {
        headers: {
          token: token,
        }
      }
    );
  } catch (error) {
    throw new Error("error sending/reciving file");
  }


  console.log(extractText);
}



export { extractText,extractTextLocal,getApiToken };
