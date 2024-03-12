const User = require("../../models/User.js");
const bcrypt = require('bcrypt');

const logInUser = async(email, password) => {
    const existingUser = await User.findOne({ email: email });
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
                msg: "Wrong Credentials"
            }
        }
    }else{
        return {
            success: false,
            msg: "User not found"
        }
    }
}

module.exports = {logInUser}