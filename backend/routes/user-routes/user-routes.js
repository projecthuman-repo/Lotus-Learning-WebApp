const express = require('express');
const User = require("../../models/User.js");
const {logInUser} = require('../../controllers/user/user-login-logout.js')
const router = express.Router();

router.post(
    "/create-user",
     async (req, res, next) => {
      try {
        const newUser = req.body
        
        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
          return res.status(200).json({
            success: false,
            message: 'The email is already in use',
          });
        }

        const user = new User({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          accountType: newUser.accountType,
          username: newUser.username,
          email: newUser.email,
          name: newUser.username,
          password: newUser.password,


        });
        await user.save().then(() => {
          return res.status(200).json({
            success: true,
            user: user,
          });
        })
  

      } catch (error) {
        return next(error.message);
      }
    }
  );

router.post('/login-user', async(req, res, next) => {
  try{
    const loginUser = req.body
    const foundUser = await logInUser(loginUser.email, loginUser.password);

    if(foundUser.success){
      return res.status(200).json({
        success: true,
        user: foundUser.user
      });
    }else{
      return res.status(400).json({
        success: false,
        error: foundUser.msg
      });
    }

  }catch (error) {
    return next(error.message);
  }
})

module.exports = router;

