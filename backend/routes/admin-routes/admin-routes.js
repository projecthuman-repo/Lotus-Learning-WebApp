const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");

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

module.exports = router;
