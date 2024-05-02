const express = require('express');
const User = require("../../models/User.js");
const InvitationCode   = require("../../models/InvitationCodeModel.js");
const { logInUser } = require('../../controllers/user/user-login-logout.js');
const router = express.Router();
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
module.exports = router;