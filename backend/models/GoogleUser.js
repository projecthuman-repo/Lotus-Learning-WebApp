const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const googleUserSchema = new mongoose.Schema({
	userId: {type: String, required: true, unique: true},
	accessToken: {type: String, required: true, unique: true}
});

// Hash the accesstoken before saving
googleUserSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('accessToken')) {
            return next();
        }

        const hashedAccessToken = await bcrypt.hash(this.accessToken, 10);
        this.accessToken = hashedAccessToken;
        next();
    } catch (error) {
        return next(error);
    }
});
const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

module.exports = GoogleUser;