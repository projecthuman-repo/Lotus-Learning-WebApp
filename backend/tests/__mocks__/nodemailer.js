const sendMailMock = jest.fn((mailOptions, callback) => {
  callback(null, { response: 'Mock email sent' });
});

const createTransportMock = jest.fn(() => ({
  sendMail: sendMailMock,
}));

const nodemailer = {
  createTransport: createTransportMock,
};

module.exports = nodemailer;