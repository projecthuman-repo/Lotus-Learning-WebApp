const mongoose = require('mongoose');

const invitationCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    expDate: {
        type: Date,
    }
});

const InvitationCode = mongoose.model('InvitationCode', invitationCodeSchema);

module.exports = InvitationCode;