const express = require('express');
const User = require("../../models/User.js");
const { logInUser } = require('../../controllers/user/user-login-logout.js');
const router = express.Router();
router.post("/create-user", async(req, res, next) => {
    try {
        const newUser = req.body;
        // Check if the email is already in use
        const existingUserByEmail = await User.findOne({ email: newUser.email });
        if (existingUserByEmail) {
            return res.status(200).json({
                success: false,
                message: 'The email is already in use',
            });
        }
        // Check if the username is already taken
        const existingUserByUsername = await User.findOne({ username: newUser.username });
        if (existingUserByUsername) {
            return res.status(200).json({
                success: false,
                message: 'The username is already taken',
            });
        }
        // If both checks pass, proceed to create the user
        const user = new User({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            accountType: newUser.accountType,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
        });
        await user.save();
        return res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        return next(error);
    }
});
router.post('/login-user', async(req, res, next) => {
    try {
        const loginUser = req.body;
        const foundUser = await logInUser(loginUser.email, loginUser.password);
        if (foundUser.success) {
            return res.status(200).json({
                success: true,
                user: foundUser.user
            });
        } else {
            return res.status(400).json({
                success: false,
                error: foundUser.msg
            });
        }
    } catch (error) {
        return next(error);
    }
});

router.post('/forgot-password', async(req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email does not exist'
            });
        }
        // Code to handle password reset link 
        return res.status(200).json({
            success: true,
            message: 'Password reset email sent.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});
module.exports = router;