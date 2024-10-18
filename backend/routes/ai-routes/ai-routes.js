const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const multer = require("multer");
const FormData = require("form-data");

const BASEAPI_URL = "http://34.130.79.237:8080/api";

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

const getToken = async () => {
  try {
    const tokenreq = await axios.post(BASEAPI_URL + "/auth/gettoken", {
      password: "test",
      username: "test",
    });
    return tokenreq.data.token;
  } catch (error) {
    throw new Error("error getting token", error);
  }
};

router.get("/get-api-token", async (req, res, next) => {
  try {
    const tokenreq = await axios.post(BASEAPI_URL + "/auth/gettoken", {
      password: "test",
      username: "test",
    });
    return res.status(200).json({
      token: tokenreq.data.token,
      success: true,
    });
  } catch (error) {
    throw new Error("error getting token", error);
  }
});

//UPLOAD PDF FILES
router.post("/extract-text", upload.single("pdf"), async (req, res, next) => {
  try {
    // Step 1: Get the token
    const token = await getToken();

    if (!token) {
      res.status(500).send("Failed to get token");
      return;
    }

    // Step 2: Read the file
    const file = req.file;
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }

    // Step 3: Upload the file with authorization header and file as form-data
    const formData = new FormData();
    formData.append("document", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const headers = {
      ...formData.getHeaders(),
      token: token, // Use 'token' as the key
    };

    const response = await axios.post(
      BASEAPI_URL + "/document/extract-text",
      formData,
      {
        headers: headers,
      }
    );

    if (response.status !== 200) {
      throw new Error(`File upload failed with status ${response.status}`);
    }
    // Step 4: Return the response from the server

    return res.status(200).json({
      data: response.data,
      success: true,
    });

    // const result = await response.text();
    // res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
});

//generate word definition pairs
const wordDefPairs = async (material_id, token) => {
  try {
    const headers = {
      token: token, // Use 'token' as the key
    };
    const response = await axios.post(
      BASEAPI_URL + "/llm/generate-word-definition-pairs",
      {
        count: 10,
        material_id: material_id,
        selected_text: " "
      },
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("error getting wordDefPairs", error);
  }
};

//GET CROSSWORD
router.post("/get-crossword", async (req, res, next) => {
  const token = await getToken();
  if (!token) {
    res.status(500).send("Failed to get token");
    return;
  }
  try {
    const { materialId } = req.body
    const headers = { token: token };
    const resWordPairs = await wordDefPairs(materialId, token)
    const response = await axios.post(
      BASEAPI_URL + "/game/crossword",
      {
        game_id:  resWordPairs.game_id,
        grid_size: 20
      },
      {
        headers: headers,
      }
    );
    
    return res.status(200).json({
      data: {game: response.data,
        basegame: resWordPairs
      },
      success: true,
    })
  } catch (error) {
    res.status(500).send("Internal server error /get-crossword");
  }
});

//GET FILL IN THE BLANKS
router.post("/get-fill-in-blanks", async (req, res, next) => {
  const token = await getToken();
  if (!token) {
    res.status(500).send("Failed to get token");
    return;
  }
  try {
    const { materialId } = req.body
    const headers = { token: token };
    const response = await axios.post(
      BASEAPI_URL + "/llm/generate-fill-in-the-blanks",
      {
        count: 4,
        material_id: materialId,
        selected_text: ""
      },
      {
        headers: headers,
      }
    );
    console.log(response);
    return res.status(200).json({
      data: {game: response.data,
      },
      success: true,
    })
  } catch (error) {
    res.status(500).send("Internal server error /get-fill-in-blanks");
  }
});

//GET MUTIPLE CHOICE QUIESITONS
router.post("/get-mcqs", async (req, res, next) => {
  const token = await getToken();
  if (!token) {
    res.status(500).send("Failed to get token");
    return;
  }
  try {
    const { materialId } = req.body
    const headers = { token: token };
    const response = await axios.post(
      BASEAPI_URL + "/llm/generate-mcqs",
      {
        count: 6,
        material_id: materialId,
        selected_text: ""
      },
      {
        headers: headers,
      }
    );
    console.log(response);
    return res.status(200).json({
      data: {game: response.data,
      },
      success: true,
    })
  } catch (error) {
    res.status(500).send("Internal server error /get-fill-in-blanks");
  }
});

//GET WORD DEF GAME
router.post("/get-word-def", async (req, res, next) => {
  const token = await getToken();
  if (!token) {
    res.status(500).send("Failed to get token");
    return;
  }
  try {
    const { materialId } = req.body
    const resWordPairs = await wordDefPairs(materialId, token)

    return res.status(200).json({
      data: {game: resWordPairs,
      },
      success: true,
    })
  } catch (error) {
    res.status(500).send("Internal server error /get-word-def");
  }
});

module.exports = router;
