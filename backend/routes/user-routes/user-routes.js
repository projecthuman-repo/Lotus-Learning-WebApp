// user-routes.js //
require('dotenv').config(); // This loads the environment variables from .env file into process.env
const express = require('express');
const User = require("../../models/User.js");
const InvitationCode   = require("../../models/InvitationCodeModel.js");
const GoogleUser = require("../../models/GoogleUser.js");
const { logInUser, userExists, getUserId } = require('../../controllers/user/user-login-logout.js');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const qs = require('qs');
const { refreshToken } = require('firebase-admin/app');
const jwt = require('jsonwebtoken');
const twilio = require('twilio'); // For sending SMS notifications
const { TWILIO_PHONE_NUMBER } = require('../../utils/config.js');

const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    JWT_SECRET,
    GMAIL_USER,
    GMAIL_PASS
  } = process.env;

console.log(TWILIO_ACCOUNT_SID);
console.log(TWILIO_AUTH_TOKEN);
console.log(TWILIO_PHONE_NUMBER);

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER, // Replace with your Gmail email
        pass: GMAIL_PASS // Replace with your Gmail password
    }
});

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
            isVerified:false,
            institution: {
                admin: true,
                code: newUser.code,
                institutionName: newUser.username
            }
        });
        await user.save();

        // Send welcome email to the user
      
        const token = jwt.sign({
            email : newUser.email
        }, JWT_SECRET, { expiresIn: '10m' });
        
        const mailOptions = {
            from: '"Lotus Learning" <noreply@projecthumancity.com>',
            to: newUser.email,
            subject: 'Welcome to Lotus Learning',
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                    <div style="text-align: center;">
                        <img src="https://lh3.googleusercontent.com/pw/AP1GczNscF1hxSYKey8qkvjkohfOGh0VARUMSZLHp4bXTY1BrN2w5WXzgc1GgOCJIfy7E2clXSXFGfSP8skEWpHltEvczA8dr3gGOpgRsdSA1MbEw38-osUuCVC6Ikg63EVbv5-7YeBVXn57JtwwW9vkOTg=w462-h388-s-no-gm?authuser=0" alt="Placeholder Image" style="width: 170px; height: 150px; border-radius: 50%; margin-bottom: 20px;" />  
                        <h2 style="font-family: Arial, sans-serif; color: #333;">Hey ${newUser.username}, Welcome to Lotus Learning.  </h2>
                        <p> Please follow the given link to verify your email: http://localhost:3000/verify/${token}</p></br><p>It's valid for 10 minutes. </p>
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

         // Send welcome email to the user using external API
        //  try {
        //     await axios.post('http://localhost:5000/api/trigger-notifications', {
        //         email: newUser.email,
        //         subject: 'Welcome to Lotus Learning',
        //         message: `
        //             <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
        //                 <div style="text-align: center;">
        //                     <img src="https://lh3.googleusercontent.com/pw/AP1GczNscF1hxSYKey8qkvjkohfOGh0VARUMSZLHp4bXTY1BrN2w5WXzgc1GgOCJIfy7E2clXSXFGfSP8skEWpHltEvczA8dr3gGOpgRsdSA1MbEw38-osUuCVC6Ikg63EVbv5-7YeBVXn57JtwwW9vkOTg=w462-h388-s-no-gm?authuser=0" alt="Placeholder Image" style="width: 170px; height: 150px; border-radius: 50%; margin-bottom: 20px;" />  
        //                     <h2 style="font-family: Arial, sans-serif; color: #333;">Hey ${newUser.firstName}, Welcome to Lotus Learning</h2>
        //                 </div>
        //                 <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
        //                     <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">Lotus Learning is not just a website, it's an immersive gateway to boundless knowledge and engaging experiences. Picture a serene digital oasis where users embark on a journey of learning, exploration, and personal growth.</p>
        //                     <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">At Lotus Learning, education meets entertainment seamlessly. Users can delve into a vast array of courses spanning diverse subjects, from the fundamentals of mathematics to the intricacies of astrophysics, all curated to cater to varying levels of expertise and interests. Whether you're a curious novice or a seasoned scholar, there's always something new to discover.</p>
        //                     <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">But learning doesn't stop at traditional coursework. Lotus Learning invites users to engage in interactive games designed to stimulate the mind and foster creativity. Dive into thought-provoking puzzles, embark on virtual adventures, and challenge yourself in a dynamic gaming environment where fun and learning intertwine harmoniously.</p>
        //                     <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">Welcome to Lotus Learning, where enlightenment meets enjoyment, and every click takes you one step closer to unlocking your full potential.</p>
        //                 </div>
        //             </div>
        //         `,
        //     });
        //     console.log('Welcome email sent successfully');
        // } catch (error) {
        //     console.log('Error sending welcome email:', error);
        // }
        // const sendWelcomeEmail = async () => {
        //     try {
        //       const response = await axios.post('http://localhost:5000/api/trigger-notifications', {
        //         type: 'email',
        //         userId: 'testid', // Replace with actual userId if applicable
        //         payload: {
        //           title: 'Welcome to Lotus Learning',
        //           body: `
        //             <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
        //               <div style="text-align: center;">
        //                 <img src="https://lh3.googleusercontent.com/pw/AP1GczNscF1hxSYKey8qkvjkohfOGh0VARUMSZLHp4bXTY1BrN2w5WXzgc1GgOCJIfy7E2clXSXFGfSP8skEWpHltEvczA8dr3gGOpgRsdSA1MbEw38-osUuCVC6Ikg63EVbv5-7YeBVXn57JtwwW9vkOTg=w462-h388-s-no-gm?authuser=0" alt="Placeholder Image" style="width: 170px; height: 150px; border-radius: 50%; margin-bottom: 20px;" />  
        //                 <h2 style="font-family: Arial, sans-serif; color: #333;">Hey ${newUser.firstName}, Welcome to Lotus Learning</h2>
        //               </div>
        //               <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
        //                 <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">Lotus Learning is not just a website, it's an immersive gateway to boundless knowledge and engaging experiences. Picture a serene digital oasis where users embark on a journey of learning, exploration, and personal growth.</p>
        //                 <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">At Lotus Learning, education meets entertainment seamlessly. Users can delve into a vast array of courses spanning diverse subjects, from the fundamentals of mathematics to the intricacies of astrophysics, all curated to cater to varying levels of expertise and interests. Whether you're a curious novice or a seasoned scholar, there's always something new to discover.</p>
        //                 <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">But learning doesn't stop at traditional coursework. Lotus Learning invites users to engage in interactive games designed to stimulate the mind and foster creativity. Dive into thought-provoking puzzles, embark on virtual adventures, and challenge yourself in a dynamic gaming environment where fun and learning intertwine harmoniously.</p>
        //                 <p style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">Welcome to Lotus Learning, where enlightenment meets enjoyment, and every click takes you one step closer to unlocking your full potential.</p>
        //               </div>
        //             </div>
        //           `
        //         }
        //       });
          
        //       console.log('Welcome email sent successfully');
        //       console.log(response.data); // Optionally log response data
        //     } catch (error) {
        //       console.error('Error sending welcome email:', error);
        //     }
        //   };
        //   sendWelcomeEmail();

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
                    isVerified:false,
                    institution: {
                        admin: false,
                        code: newUser.code,
                        institutionName: foundInstitution.institution.institutionName
                    }
                }

                const token = jwt.sign({
                    email: newUser.email
                }, JWT_SECRET, { expiresIn: '10m' });
                
                const mailOptions = {
                    from: '"Lotus Learning" <noreply@projecthumancity.com>',
                    to: newUser.email,
                    subject: 'Welcome to Lotus Learning',
                    html: `
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                            <div style="text-align: center;">
                                <img src="https://lh3.googleusercontent.com/pw/AP1GczNscF1hxSYKey8qkvjkohfOGh0VARUMSZLHp4bXTY1BrN2w5WXzgc1GgOCJIfy7E2clXSXFGfSP8skEWpHltEvczA8dr3gGOpgRsdSA1MbEw38-osUuCVC6Ikg63EVbv5-7YeBVXn57JtwwW9vkOTg=w462-h388-s-no-gm?authuser=0" alt="Placeholder Image" style="width: 170px; height: 150px; border-radius: 50%; margin-bottom: 20px;" />  
                                <h2 style="font-family: Arial, sans-serif; color: #333;">Hey ${newUser.username}, Welcome to Lotus Learning. </h2>
                                 <p> Please follow the given link to verify your email: http://localhost:3000/verify/${token}</p></br><p>It's valid for 10 minutes. </p>
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
                createUser(user)
            }else{
                const user = {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    accountType: newUser.accountType,
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                    isVerified:false,
                    institution: {
                        admin: false,
                    }
                };

           
                const token = jwt.sign({
                    email: newUser.email
                }, JWT_SECRET, { expiresIn: '10m' });
                
                const mailOptions = {
                    from: '"Lotus Learning" <noreply@projecthumancity.com>',
                    to: newUser.email,
                    subject: 'Welcome to Lotus Learning',
                    html: `
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                            <div style="text-align: center;">
                                <img src="https://lh3.googleusercontent.com/pw/AP1GczNscF1hxSYKey8qkvjkohfOGh0VARUMSZLHp4bXTY1BrN2w5WXzgc1GgOCJIfy7E2clXSXFGfSP8skEWpHltEvczA8dr3gGOpgRsdSA1MbEw38-osUuCVC6Ikg63EVbv5-7YeBVXn57JtwwW9vkOTg=w462-h388-s-no-gm?authuser=0" alt="Placeholder Image" style="width: 170px; height: 150px; border-radius: 50%; margin-bottom: 20px;" />  
                                <h2 style="font-family: Arial, sans-serif; color: #333;">Hey ${newUser.username}, Welcome to Lotus Learning. </h2>
                                 <p> Please follow the given link to verify your email: http://localhost:3000/verify/${token}</p></br><p>It's valid for 10 minutes. </p>
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

                createUser(user)
            }
        }
    } catch (error) {
        return next(error);
    }
});

router.post('/login-user', async (req, res, next) => {
    try {
        const loginUser = req.body;
        const foundUser = await logInUser(loginUser.email, loginUser.password);

        if (foundUser.success) {
            if (!foundUser.user.googleAuth && !foundUser.user.isVerified) {
                return res.status(400).json({
                    success: false,
                    error: 'Your account has not been verified. Please check your email for the verification link.',
                });
            }

            return res.status(200).json({
                success: true,
                user: foundUser.user,
            });
        } else {
            return res.status(400).json({
                success: false,
                error: foundUser.msg,
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


router.post('/google-login', async (req, res, next) => {
    try {
      const loginUser = req.body;
      const foundUser = await userExists(loginUser.email);
  
      if (foundUser && foundUser.success) {
        // User exists, update the tokens
        const userId = await getUserId(loginUser.email);
  
        const updatedGoogleUser = await GoogleUser.findOneAndUpdate(
          { userId: userId },
          {
            accessToken: loginUser.accessToken,
            refreshToken: loginUser.refreshToken,
            accessTokenExpiry: new Date(Date.now() + loginUser.expiresIn * 1000), 
          },
          { new: true }
        );
  
        return res.status(200).json({
          success: true,
          user: foundUser.user,
          googleUser: updatedGoogleUser,
        });
      } else {
        // User does not exist, create a new user
        const user = new User({
          firstName: loginUser.firstName,
          lastName: loginUser.lastName || '',
          accountType: loginUser.accountType,
          username: loginUser.username,
          email: loginUser.email,
          password: 'GOOGLE_LOGIN', // Placeholder
          googleAuth: true,
          isVerified:true,
          is2FASetupDone:false, // Add 2FA setup flag
        });
        await user.save();
  
        const userId = await getUserId(loginUser.email);
  
        const googleUser = new GoogleUser({
          userId: userId,
          accessToken: loginUser.accessToken,
          refreshToken: loginUser.refreshToken,
          accessTokenExpiry: new Date(Date.now() + loginUser.expiresIn * 1000),
          email: loginUser.email
        });
        await googleUser.save();
  
        return res.status(200).json({
          success: true,
          user: user,
          googleUser: googleUser,
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
        if (!user || user.googleAuth) {
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


router.get('/verify/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user using the decoded email
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Email verification failed, possibly the link is invalid or expired' });
    }

    // Update the isVerified field to true
    user.isVerified = true;
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Email verification failed, possibly the link is invalid or expired' });
  }
});

router.post('/resend-verification', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: 'This account is already verified.' });
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '10m' });

        const mailOptions = {
            from: '"Lotus Learning" <noreply@projecthumancity.com>',
            to: user.email,
            subject: 'Resend Verification Email',

            html: `
            <div style="text-align: center;">
                <h1>Lotus Learning Verification</h1>
                <h3>Please verify your email by clicking the link below:</h3>
                   <img src="https://lh3.googleusercontent.com/pw/AP1GczNscF1hxSYKey8qkvjkohfOGh0VARUMSZLHp4bXTY1BrN2w5WXzgc1GgOCJIfy7E2clXSXFGfSP8skEWpHltEvczA8dr3gGOpgRsdSA1MbEw38-osUuCVC6Ikg63EVbv5-7YeBVXn57JtwwW9vkOTg=w462-h388-s-no-gm?authuser=0" alt="Placeholder Image" style="width: 170px; height: 150px; display: block; margin: 0 auto;" />
                <p>http://localhost:3000/verify/${token}</strong>. </p> 
                <p> It's valid for 10 minutes.</p>
            </div>
        `
    };
     

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: 'Failed to send verification email' });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({ success: true, message: 'Verification email sent' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.post('/send-verification-code', async (req, res) => {
    const { email, phoneNumber } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
  
    try {
      await User.findOneAndUpdate(
        { email},
        { phoneNumber, verificationCode },
        { new: true }
      );

      await client.messages.create({
        body: `Your verification code is ${verificationCode}`,
        from: TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to send verification code:', error);
      res.status(500).send('Failed to send verification code');
    }
  });
  
  router.post('/verify-code', async (req, res) => {
    const { email, code } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user && user.verificationCode === parseInt(code)) {
        user.is2FASetupDone = true;
        user.verificationCode = null; 
        await user.save();
  
        res.sendStatus(200);
      } else {
        res.status(400).send('Invalid verification code');
      }
    } catch (error) {
      console.error('Failed to verify code:', error);
      res.status(500).send('Failed to verify code');
    }
  });

module.exports = router;

