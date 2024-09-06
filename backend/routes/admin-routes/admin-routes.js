const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");
const nodemailer = require('nodemailer');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
app.use(cors());
app.use(bodyParser.json());


const dbConnectionString = process.env.BLN_CONNECT;

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));



router.post("/get-students", async (req, res, next) => {
  try {
    const code = req.body.code;
    const users = await User.find({
      $and: [{ "institution.code": code }, { accountType: "student" }],
    });
    if (users) {
      return res.status(200).json({
        success: true,
        data: users,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Error at /admin/get-students",
      });
    }
  } catch (error) {
    return next(error);
  }
});




router.post("/get-teachers", async (req, res, next) => {
    try {
      const code = req.body.code;
      const users = await User.find({
        $and: [{ "institution.code": code }, { accountType: "instructor" }],
      });
      if (users) {
        return res.status(200).json({
          success: true,
          data: users,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "Error at /admin/get-teachers",
        });
      }
    } catch (error) {
      return next(error);
    }
  });

// // Fetch all student emails without requiring an institution code
// router.get("/get-students", async (req, res, next) => {
//   try {
//     const users = await User.find({ accountType: "student" }).select('email');
//     if (users && users.length > 0) {
//       return res.status(200).json({
//         success: true,
//         data: users,
//       });
//     } else {
//       return res.status(404).json({
//         success: false,
//         error: "No students found",
//       });
//     }
//   } catch (error) {
//     return next(error);
//   }
// });


// // Fetch student emails by institution code
// router.post('/get-students', async (req, res, next) => {
//   try {
//     const code = req.body.code;

//     const users = await User.find(
//       { $and: [{ 'institution.code': code }, { accountType: 'student' }] },
//       'username email' // This will return both username and email fields
//     );


//     // Check if any users were found
//     if (users.length > 0) {
//       return res.status(200).json({
//         success: true,
//         data: users.map(user => user.email), // Map to return only emails
//       });
//     } else {
//       return res.status(404).json({
//         success: false,
//         error: 'No students found for the given institution code',
//       });
//     }
//   } catch (error) {
//     return next(error);
//   }
// });

// Send notification email
app.post('/api/send-notification', async (req, res) => {
  const { email, title, message } = req.body;
  try {
    await sendNotificationEmail(email, title, message);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNotificationEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };
    return transporter.sendMail(mailOptions);
};

module.exports = { sendNotificationEmail };

module.exports = router;
