const request = require('supertest');
const { app } = require('../server'); 
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Course = require('../models/Course'); 
const { connectToDatabases } = require('../db/connection');
const GoogleUser = require('../models/GoogleUser');

let server;
let otp;

jest.mock('../controllers/course/create-new-course', () => ({
  createNewCourse: jest.fn(),
}));

beforeAll(async () => {
  await connectToDatabases();
  port = 0;
  server = app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
  });
});

afterEach(async () => {
  await User.deleteMany({ email: { $in: ['testsomething12361@gmail.com', 'testrand667@example.com'] } });
  if (server) await server.close();
});

function generateOTP() {
  const digits = '0123456789';
  return Array.from({ length: 6 }, () => digits[Math.floor(Math.random() * 10)]).join('');
}

async function registerNewUser() {
  const newUser = {
    email: 'testrand667@example.com',
    password: 'password123',
    username: 'testuser557',
  };
  return await request(app).post('/user/create-user').send(newUser);
}

describe('User API', () => {

  beforeEach(async () => {
    const user = await User.findOne({ email: 'gordonsortan@gmail.com' });
    otp = generateOTP();
    user.passwordResetOTP = {
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    };
    await user.save();
  });

  it('should register a new user', async () => {
    const res = await registerNewUser();

    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toHaveProperty('email', 'testrand667@example.com');
    expect(res.body.user).toHaveProperty('username', 'testuser557');
    const isPasswordHashed = await bcrypt.compare('password123', res.body.user.password);
    expect(isPasswordHashed).toBe(true);

    const userId = res.body.user._id;
    const user = await User.findById(userId);
    expect(user).not.toBeNull();
    expect(user.email).toBe('testrand667@example.com');
    expect(user.username).toBe('testuser557');

    const deleteRes = await request(app).delete(`/user/delete-user/${userId}`);
    expect(deleteRes.statusCode).toEqual(200);
    const deletedUser = await User.findById(userId);
    expect(deletedUser).toBeNull();
  });

  it('should login existing user', async () => {
    const loginUser = { email: 'testrand667@example.com', password: 'password123' };
    await registerNewUser();
    const res = await request(app).post('/user/login-user').send(loginUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toHaveProperty('email', 'testrand667@example.com');
    expect(res.body.user).toHaveProperty('username', 'testuser557');
    const passHash = await bcrypt.compare('password123', res.body.user.password);
    expect(passHash).toBe(true);
  });

  it('should logout existing user', async () => {
    const loginUser = { email: 'testrand667@example.com', password: 'password123' };
    await registerNewUser();
    await request(app).post('/user/login-user').send(loginUser);
    const res = await request(app).get('/user/logout-user');
    expect(res.statusCode).toEqual(200);
  });

  it('should return success if code is found', async () => {
    const res = await request(app).post('/user/check-invitation-code').send({ code: '000000' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should return failure 404 if code is not found', async () => {
    const res = await request(app).post('/user/check-invitation-code').send({ code: '000010' });
    expect(res.statusCode).toEqual(404);
  });

  it('should send a password reset OTP if email exists', async () => {
    const res = await request(app).post('/user/forgot-password').send({ email: 'gordontan.dev@projecthumancity.com' });
    expect(res.statusCode).toEqual(200);
  });

  it('should verify the OTP successfully', async () => {
    const verifyRes = await request(app).post('/user/verify-otp').send({ otp });
    expect(verifyRes.statusCode).toEqual(200);
    expect(verifyRes.body).toHaveProperty('success', true);
    expect(verifyRes.body).toHaveProperty('message', 'OTP verified successfully');
  });

  it('should return an error for invalid OTP', async () => {
    const verifyRes = await request(app).post('/user/verify-otp').send({ otp: '123@@@@56' });
    expect(verifyRes.statusCode).toEqual(400);
    expect(verifyRes.body).toHaveProperty('success', false);
    expect(verifyRes.body).toHaveProperty('message', 'Invalid or expired OTP');
  });

  it('should return an error for expired OTP', async () => {
    const expiredOtpUser = new User({
      email: '11testuser@example.com',
      password: 'correctpassword',
      username: 'testuser',
      passwordResetOTP: {
        otp: '123456',
        expiresAt: new Date(Date.now() - 5 * 60 * 1000)
      }
    });
    await expiredOtpUser.save();

    const res = await request(app).post('/user/verify-otp').send({ otp: '123456' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Invalid or expired OTP');
    await User.deleteMany({ email: '11testuser@example.com' });
  });

  it('should update OTP', async () => {
    const verifyRes = await request(app).put('/user/update-otp/gordonsortan@gmail.com').send({ otp: 123456 });
    expect(verifyRes.statusCode).toEqual(200);
  });

  it('should get user by email', async () => {
    const verifyRes = await request(app).get('/user/get-user/gordonsortan@gmail.com');
    expect(verifyRes.statusCode).toEqual(200);
    expect(verifyRes.body).toHaveProperty('user');
    const user = verifyRes.body.user;
    expect(user).toBeDefined();
  });

  describe('POST /forgot-password', () => {
    it('should return 404 if the user does not exist', async () => {
      const response = await request(app).post('/user/forgot-password').send({ email: 'nonexistent@example.com' });
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ success: false, message: 'Email does not exist' });
    });

    it('should generate and save OTP, then send an email', async () => {
      await request(app).post('/user/forgot-password').send({ email: 'gordonsortan@gmail.com' });

      const response = await request(app).post('/user/forgot-password').send({ email: 'gordonsortan@gmail.com' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true, message: 'Password reset OTP sent to your email' });

      const updatedUser = await User.findOne({ email: 'gordonsortan@gmail.com' });
      expect(updatedUser.passwordResetOTP).toBeDefined();
      expect(updatedUser.passwordResetOTP.otp).toHaveLength(6);

      const transport = nodemailer.createTransport();
      expect(transport.sendMail).toHaveBeenCalled();
      expect(transport.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'gordonsortan@gmail.com',
          subject: 'Lotus Learning OTP',
        }),
        expect.any(Function)
      );
    });
  });

  it('should log in existing user with Google account', async () => {
    const res = await request(app).post('/user/google-login').send({
      email: 'gordonsortan@gmail.com',
      accessToken: 'test-token'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toHaveProperty('email', 'gordonsortan@gmail.com');
  });

  it('should create a new user with Google account if it does not exist', async () => {
    const res = await request(app).post('/user/google-login').send({
      firstName: 'Test',
      lastName: 'User',
      accountType: 'student',
      username: 'testuser',
      email: 'testsomething12361@gmail.com',
      accessToken: 'google-token',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toHaveProperty('email', 'testsomething12361@gmail.com');

    const createdUser = await User.findOne({ email: 'testsomething12361@gmail.com' });
    expect(createdUser).not.toBeNull();
    expect(createdUser.username).toBe('testuser');

    const createdGoogleUser = await GoogleUser.findOne({ userId: createdUser._id });
    expect(createdGoogleUser).not.toBeNull();

    await GoogleUser.deleteOne({ userId: createdUser._id });
  });

  it('should change password and save correctly', async () => {
    const res = await request(app).post('/user/change-password').send({
      email: 'test@mail.com',
      newPassword: '12345678'
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toHaveProperty('email', 'test@mail.com');

    const user = await User.findOne({ email: 'test@mail.com' });
    const isPasswordCorrect = await bcrypt.compare('12345678', user.password);
    expect(isPasswordCorrect).toBe(true);
  });
});
