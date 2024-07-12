const request = require('supertest');
const mongoose = require('mongoose');
const {app} = require('../server'); 
const { updateCourseData } = require('../controllers/course/update-course-content'); 

const Course = require("../models/CourseModel.js");
const { connectToDatabases } = require('../db/connection');

let server;

beforeAll(async () => {
    await connectToDatabases();
    port = 0;
    server = app.listen(port, () => {
  
    });
  });

  afterAll(async () => {
 
    if (server) {
      await server.close();
    }
  });

describe('updateCourseData tests', () => {
  
  });
  it('should throw an error if the course ID is invalid', async () => {
    const invalidCourse = {
      _id: 'invalid_id',
      title: 'Updated Course Title',
    };

    try {
      await updateCourseData(invalidCourse);
    } catch (error) {
      expect(error.message).toBe('Error en updateCourseData()');
    }
  });

  it('should return undefined if the course does not exist', async () => {
    const nonExistentCourse = {
      _id: new mongoose.Types.ObjectId(),
      title: 'Updated Course Title',
    };

    const result = await updateCourseData(nonExistentCourse);
    expect(result).toBeUndefined();
  });

  it('should throw an error if it is missing a required field', async () => {
    const newCourse = new Course({

      completed: false,
      accepted: false,
      description: 'Initial Description',
      categories: ['Programming', 'Computer Science', 'Python'],
      age: '18+',
      creator: {
        username: 'john_doe',
        code: 'INST001',
        institutionName: 'Tech University',
        email: 'john.doe@example.com',
        accountType: 'admin',
      },
    });

    try {
      await updateCourseData(newCourse);
    } catch (error) {
      expect(error.message).toBe('Error in updateCourseData()');
    }
  });

