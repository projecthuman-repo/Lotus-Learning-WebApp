const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require('fs');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const PDFDocument = require('pdfkit');
const FormData = require('form-data');

const BASEAPI_URL = "http://34.130.17.89:8080/api";

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

router.post("/extract-text", upload.single("file"), async (req, res, next) => {
  try {
    const file = req.file;
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.path), {filename: 'document.pdf'});
    console.log(formData);
    const token = await getToken();
    const extractText = await axios.post(
      BASEAPI_URL + "/document/extract-text",
      {
        "document": formData,
      },
      {
        headers: {
          token: token,
        }
      }
    );

    console.log(extractText);
  } catch (error) {
    console.log(error);
    console.log("f");
  }
});

module.exports = router;
