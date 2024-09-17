// user-routes.js
const express = require('express');
const User = require("../../models/User.js");
const Course = require("../../models/CourseModel.js");
const InvitationCode   = require("../../models/InvitationCodeModel.js");
const GoogleUser = require("../../models/GoogleUser.js");

const { logInUser, userExists, getUserId } = require('../../controllers/user/user-login-logout.js');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

function generateOTP() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

router.post("/create-user", async(req, res, next) => {

    const createUser = async(newuser) => {
        const user = new User(newuser);
        await user.save();
        return res.status(200).json({
            success: true,
            user: user,
        });
    }
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
        if(newUser.accountType === 'admin'){
        const user = new User({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            accountType: newUser.accountType,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            institution: {
                admin: true,
                code: newUser.code,
                institutionName: newUser.username
            }
        });
        await user.save();
        
        // Send welcome email to the user
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreply@projecthumancity.com', // Replace with your Gmail email
                pass: 'zszaqvzpbfvmnhhw' // Replace with your Gmail password
            }
        });
        const mailOptions = {
            from: '"Lotus Learning" <noreply@projecthumancity.com>',
            to: newUser.email,
            subject: 'Welcome to Lotus Learning',
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                    <div style="text-align: center;">
                        <img src="https://lh3.googleusercontent.com/pw/AP1GczNscF1hxSYKey8qkvjkohfOGh0VARUMSZLHp4bXTY1BrN2w5WXzgc1GgOCJIfy7E2clXSXFGfSP8skEWpHltEvczA8dr3gGOpgRsdSA1MbEw38-osUuCVC6Ikg63EVbv5-7YeBVXn57JtwwW9vkOTg=w462-h388-s-no-gm?authuser=0" alt="Placeholder Image" style="width: 170px; height: 150px; border-radius: 50%; margin-bottom: 20px;" />  
                        <h2 style="font-family: Arial, sans-serif; color: #333;">Hey ${newUser.firstName}, Welcome to Lotus Learning</h2>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                        <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">Lotus Learning is not just a website, it's an immersive gateway to boundless knowledge and engaging experiences. Picture a serene digital oasis where users embark on a journey of learning, exploration, and personal growth.</p>
                        <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">At Lotus Learning, education meets entertainment seamlessly. Users can delve into a vast array of courses spanning diverse subjects, from the fundamentals of mathematics to the intricacies of astrophysics, all curated to cater to varying levels of expertise and interests. Whether you're a curious novice or a seasoned scholar, there's always something new to discover.</p>
                        <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">But learning doesn't stop at traditional coursework. Lotus Learning invites users to engage in interactive games designed to stimulate the mind and foster creativity. Dive into thought-provoking puzzles, embark on virtual adventures, and challenge yourself in a dynamic gaming environment where fun and learning intertwine harmoniously.</p>
                        <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">Welcome to Lotus Learning, where enlightenment meets enjoyment, and every click takes you one step closer to unlocking your full potential.</p>
                    </div>
                </div>
            `,
        };
        
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                // Handle email sending error
            } else {
                console.log('Email sent:', info.response);
                // Handle successful email sending
            }
        });

        return res.status(200).json({
            success: true,
            user: user,
        });
        }else if(newUser.accountType !== 'admin'){ 
            if(newUser.linkedCode){
                const foundInstitution = await User.findOne({ 'institution.code': newUser.code });
                if (!foundInstitution){
                    return res.status(200).json({
                        success: false,
                        message: 'Institution not found',
                    });
                }
                const user = {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    accountType: newUser.accountType,
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                    institution: {
                        admin: false,
                        code: newUser.code,
                        institutionName: foundInstitution.institution.institutionName
                    }
                }
                createUser(user)
            }else{
                const user = {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    accountType: newUser.accountType,
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                    institution: {
                        admin: false,
                    }
                };
                createUser(user)
            }
        }
    } catch (error) {
        return next(error);
    }
});
router.post('/login-user', async(req, res, next) => {
    try {
        const loginUser = req.body;
        const foundUser = await logInUser(loginUser.email, loginUser.password);
        if (foundUser.success && !foundUser.user.googleAuth) {
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
router.get(
    '/logout-user',
    (req, res) => {
      try {
        res.clearCookie('userDataAuth', { httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).json({ res: 'Success', message: 'User cookie deleted successfully' });
      } catch (err) {
        console.log('Server-side error', err);
        res.status(500).json({ err: 'Server-side error' });
      }
    }
  );
  
router.post('/check-invitation-code', async(req, res, next) => {
    const code = req.body.code;
    try {
        const invitationCode = await InvitationCode.findOne({ code: code });

        if (!invitationCode) {
            return res.status(404).json({ message: 'code not found' });
        }
        else{
            return res.status(200).json({
                success: true,
            });
        }

    } catch (error) {
        return next(error);
    }
})


router.post('/google-login', async(req, res, next) => {
    try {
        // Add this user to DB, if not already exists, if he does, just log him in
        const loginUser = req.body;
        const foundUser = await userExists(loginUser.email);

        if (foundUser && foundUser.success) {
            return res.status(200).json({
                success: true,
                user: foundUser.user
            });
        } else {
            const user = new User({
                firstName: loginUser.firstName,
                lastName: loginUser.lastName || '',
                accountType: loginUser.accountType,
                username: loginUser.username,
                email: loginUser.email,
                password: 'GOOGLE_LOGIN',
                googleAuth: true
            });
            await user.save();
            
            const userId = await getUserId(loginUser.email);
            
            const googleUser = new GoogleUser({
                userId: userId,
                accessToken: loginUser.accessToken
            });
            await googleUser.save();
            
            return res.status(200).json({
                success: true,
                user: user,
            });
        }
    } catch(error) {
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
                user: 'noreply@projecthumancity.com', // Replace with your Gmail email
                pass: 'zszaqvzpbfvmnhhw' // Replace with your Gmail password
            }
        });

        const mailOptions = {
            from: '"Lotus Learning" <noreply@projecthumancity.com>',
            to: email,
            subject: 'Lotus Learning OTP',
            html: `
                <div style="text-align: center;">
                    <h1>Lotus Learning OTP</h1>
                    <img src="https://lh3.googleusercontent.com/pw/AP1GczNscF1hxSYKey8qkvjkohfOGh0VARUMSZLHp4bXTY1BrN2w5WXzgc1GgOCJIfy7E2clXSXFGfSP8skEWpHltEvczA8dr3gGOpgRsdSA1MbEw38-osUuCVC6Ikg63EVbv5-7YeBVXn57JtwwW9vkOTg=w462-h388-s-no-gm?authuser=0" alt="Placeholder Image" style="width: 170px; height: 150px; display: block; margin: 0 auto;" />
                    <p>Your OTP is: <strong>${otp}</strong>. It's valid for 5 minutes</p>
                </div>
            `,
            text: `Your OTP for password reset is: ${otp}. This OTP is valid for 5 minutes.`
        };

        transporter.sendMail(mailOptions, function(error, info) {
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

router.post('/verify-otp', async(req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findOne({ "passwordResetOTP.otp": otp });

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
            message: 'OTP verified successfully',
            user: {user: user, otp: otp}
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

//email updation
router.post('/update-email', async (req, res, next) => {
    try {
        console.log("Request body:", req.body);

        const { _id, email } = req.body;

        const userBeforeUpdate = await User.findById(_id);

        if (!userBeforeUpdate) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const oldEmail = userBeforeUpdate.email;

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { email: email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, error: 'User not found after update' });
        }

        const coursesToUpdate = await Course.find({ "creator.email": oldEmail });
        if (!coursesToUpdate) {
            return res.status(404).json({ success: false, error: 'course to update not found' });
        }
        

        const updatedCourses = await Course.updateMany(
            { "creator.email": oldEmail }, 
            { $set: { "creator.email": email } } 
        );

        res.status(200).json({
            success: true,
            data: {
                user: updatedUser,
                updatedCoursesCount: updatedCourses.modifiedCount, 
            },
        });
    } catch (error) {
        console.log("Error caught in update-email route:", error);

        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

//updating username

router.post('/update-username', async (req, res, next) => {
    try {
        console.log("Request body:", req.body);

        const { _id, username } = req.body;

        const userBeforeUpdate = await User.findById(_id);

        if (!userBeforeUpdate) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const oldUsername = userBeforeUpdate.username;
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { username: username },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, error: 'User not found after update' });
        }

        const coursesToUpdate = await Course.find({ "creator.username": oldUsername});
        if (!coursesToUpdate) {
            return res.status(404).json({ success: false, error: 'course to update not found' });
        }
        

        const updatedCourses = await Course.updateMany(
            { "creator.username": oldUsername }, 
            { $set: { "creator.username": username } } 
        );

        res.status(200).json({
            success: true,
            data: {
                user: updatedUser,
            },
        });
    } catch (error) {
        console.log("Error caught in update-username route:", error);

        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

//updating institution code

router.post('/update-institution-code', async (req, res, next) => {
    try {
        console.log("Request body:", req.body);

        const { _id, code } = req.body;

        const userBeforeUpdate = await User.findById(_id);

        if (!userBeforeUpdate) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const oldCode = userBeforeUpdate.institution.code;

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { "institution.code": code },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, error: 'User not found after update' });
        }

        const updatedCourses = await Course.updateMany(
            { "creator.code": oldCode },
            { $set: { "creator.code": code } }
        );

        res.status(200).json({
            success: true,
            data: {
                user: updatedUser,
                updatedCoursesCount: updatedCourses.modifiedCount,
            },
        });
    } catch (error) {
        console.log("Error caught in update-institution-code route:", error);

        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

//update password for settingsprofile
router.post('/update-password', async (req, res, next) => {
    try {
        console.log("Request body:", req.body);

        const { _id, password } = req.body;

        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, error: 'User not found after update' });
        }

        res.status(200).json({
            success: true,
            data: {
                user: updatedUser,
            },
        });
    } catch (error) {
        console.log("Error caught in update-password route:", error);

        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});
  
  

router.post('/change-password', async(req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({email: email});
        user.password = newPassword;
        user.save();

        return res.status(200).json({
            success: true,
            user: user
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router;

