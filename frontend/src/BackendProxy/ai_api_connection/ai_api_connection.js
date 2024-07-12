import axios from "axios";

const BASE_URL = "http://localhost:5000/ai";

const extractText = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  try {
    const extractText = await axios.post(
      `${BASE_URL}/extract-text`,
      formData,
      {
        headers: {
            "Content-Type": "multipart/form-data",
          },
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error("error uploading file");
  }
};

export { extractText };
