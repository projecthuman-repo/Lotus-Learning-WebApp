const User = require("../../models/User.js");
const bcrypt = require('bcrypt');

const logInUser = async(email, password) => {
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);
    if(existingUser){
        const matchedPassword = await bcrypt.compare(password, existingUser.password);
        if(matchedPassword){
            return {
                success: true,
                user: existingUser
            }
        }
        else{
            return {
                success: false,
               // msg: "Wrong Credentials"
                msg:"Incorrect email or password"
            }
        }
    }else{
        return {
            success: false,
            //msg: "User not found"
            msg:"Incorrect email or password"
        }
    }
}

const userExists = async(email) => {
    const existingUser = await User.findOne({ email: email });
    if(existingUser) {
        return {
            success: true,
            user: existingUser
        }
    }

    return null;
}

const getUserId = async(email) => {
    const userIsReal = await userExists(email);
    if(userIsReal.success) {
        return userIsReal.user._id;
    }

    return null;
}

module.exports = {logInUser, userExists, getUserId}