const express = require('express');
const User = require("../../models/User.js");
const { logInUser } = require('../../controllers/user/user-login-logout.js');
const router = express.Router();
const nodemailer = require('nodemailer');

function generateOTP() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

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

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email does not exist'
            });
        }

        // Generate 6-digit OTP
        const otp = generateOTP();
        console.log('Generated OTP:', otp); // Log the generated OTP

        // Save OTP and its expiration time in user's document
        user.passwordResetOTP = {
            otp: otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // Set expiration time to 5 minutes from now
        };
        await user.save();
        console.log('User after saving:', user); // Log the user object after saving

        // Code to handle password reset email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreply.bankwebsite@gmail.com', // Replace with your Gmail email
                pass: 'lakmdvkwsbdtjukv' // Replace with your Gmail password
            }
        });

        const mailOptions = {
            from: 'noreply.bankwebsite@gmail.com',
            to: email,
            subject: 'Lotus Learning OTP',
            html: `
                <div style="text-align: center;">
                    <h1>Lotus Learning OTP</h1>
                    <img src="https://img2.embroiderydesigns.com/printart/xlarge/gifutto/pggif1521.webp" alt="Placeholder Image" style="width: 100px; height: 100px; display: block; margin: 0 auto;" />
                    <p>Your OTP is: <strong>${otp}</strong>. It's valid for 5 minutes</p>
                </div>
            `,
            text: `Your OTP for password reset is: ${otp}. This OTP is valid for 5 minutes.`
        };
        
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to send email'
                });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({
                    success: true,
                    message: 'Password reset OTP sent to your email'
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findOne({ "passwordResetOTP.otp": otp.toString() });

        // Check if OTP exists and is not expired
        if (!user || !user.passwordResetOTP || user.passwordResetOTP.otp !== otp || user.passwordResetOTP.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        // Clear OTP and its expiration time
        user.passwordResetOTP = undefined;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'OTP verified successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router;