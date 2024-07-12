const request = require('supertest');
const {app} = require('../server'); 

const mongoose = require('mongoose');
const Course = require("../models/CourseModel.js");
const { connectToDatabases } = require('../db/connection');

beforeAll(async () => {
    await connectToDatabases();
    port = 0;
    server = app.listen(port, () => {
  
    });
  });
  
  afterEach(async () => {
    await Course.deleteMany({ title: 'testFind23500' });
    await Course.deleteMany({ title: 'Admin Course' });
    await Course.deleteMany({ title: 'Updated Course' });
    await Course.deleteMany({ title: 'Non-Admin Course' });
    
    await Course.deleteMany({ title: 'Math 101' });
    await Course.deleteMany({ title: 'Science 101' }); 
    await Course.deleteMany({ title: 'Course 122' });
    await Course.deleteMany({ title: 'Course 222' }); 
    await Course.deleteMany({ title: 'Course 322' });  
  
    if (server) {
      await server.close();
    }
  });

  
  it('should return a list of courses', async () => {
   
       // Create new courses
       const courses = [
        {
            title: 'Course 122',
            compleated: false,
            accepted: false,
            description: 'Description for Course 1',
            categories: ['Category 1'],
            age: '18+',
            creator: {
                username: 'teacher1',
                code: '001',
                institutionName: 'Tech University',
                email: 'teacher1@example.com',
                accountType: 'instructor'
            }
        },
        {
            title: 'Course 222',
            compleated: false,
            accepted: false,
            description: 'Description for Course 2',
            categories: ['Category 2'],
            age: '18+',
            creator: {
                username: 'teacher2',
                code: '002',
                institutionName: 'Tech University',
                email: 'teacher2@example.com',
                accountType: 'instructor'
            }
        },
        {
            title: 'Course 322',
            compleated: false,
            accepted: false,
            description: 'Description for Course 3',
            categories: ['Category 3'],
            age: '18+',
            creator: {
                username: 'teacher3',
                code: '003',
                institutionName: 'Tech University',
                email: 'teacher3@example.com',
                accountType: 'instructor'
            }
        }
    ];

    await Course.insertMany(courses);

    const res = await request(app).get('/course/get-courses');
  
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
   
    const titles = ['Course 122', 'Course 222', 'Course 322'];
    const foundCourses = await Course.find({ title: { $in: titles } });

    expect(foundCourses.length).toBe(3);
    titles.forEach(title => {
        const course = foundCourses.find(course => course.title === title);
        expect(course).toBeTruthy();
        expect(course.title).toBe(title);
        expect(course).toHaveProperty('compleated');
        expect(course).toHaveProperty('accepted');
        expect(course).toHaveProperty('description');
        expect(course).toHaveProperty('age');
    });
  });



  async function propertyTestFunc(prop = '',value = '')
  {
    const course1 = new Course({
      title: 'Math 101',
        compleated: false,
        accepted: false,
        description: "python",
        age: "18+",
      creator: {
        username: "teacher1",
        code: "12347",
        institutionName: "Tech University",
        email: "teacher@example.com",
        accountType: "instructor"
    }
    });
  
    const course2 = new Course({
      title: 'Science 101',
      compleated: false,
        accepted: false,
        description: "python",
        age: "18+",
      creator: {
        username: "teacher1",
        code: "12347",
        institutionName: "Tech University",
        email: "teacher@example.com",
        accountType: "instructor"
    }
    });
  
    await course1.save();
    await course2.save();
  
    const res = await request(app)
      .post('/course/get-courses-by-prop')
      .send({ prop: prop, value: value, code: '12347' });
  
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.res.length).toBeGreaterThan(0);
    expect(res.body.res[0]).toHaveProperty(prop, value);
  }

  it('should create a new course and set accepted to true if creator is admin', async () => {
    const courseData = {
  title: "Admin Course",
  compleated: false,
  accepted: false,
  description: "python",
  categories: ["Programming", "Computer Science", "Python"],
  age: "18+",
  creator: {
    username: "john_doe",
    code: "INST001",
    institutionName: "Tech University",
    email: "john.doe@example.com",
    accountType: "admin"
  }  
}
    const res = await request(app).post('/course/create-new-course').send(courseData);
  
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
   
    expect(res.body.data.savedData).toHaveProperty('title', 'Admin Course');
    expect(res.body.data.savedData).toHaveProperty('description', 'python');
    expect(res.body.data.savedData).toHaveProperty('age', '18+');
    expect(res.body.data.savedData).toHaveProperty('accepted', true);
  });

  it('should create a new course and accepted should be false if creator is not admin', async () => {
    const courseData = {
  title: "Non-Admin Course",
  compleated: false,
  accepted: false,
  description: "python",
  categories: ["Programming", "Computer Science", "Python"],
  age: "18+",
  creator: {
    username: "john_doe",
    code: "INST001",
    institutionName: "Tech University",
    email: "john.doe@example.com",
    accountType: "student"
  }  
}
    const res = await request(app).post('/course/create-new-course').send(courseData);
  
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
   
    expect(res.body.data.savedData).toHaveProperty('title', 'Non-Admin Course');
    expect(res.body.data.savedData).toHaveProperty('description', 'python');
    expect(res.body.data.savedData).toHaveProperty('age', '18+');
    expect(res.body.data.savedData).toHaveProperty('accepted', false);
  });
  
 
  
    it('should return a course retrieved by a specific id', async () => {
      const courseData = {
      title:"testFind23500",
      compleated: false,
      accepted: false,
      description: "python",
      categories: ["Programming", "Computer Science", "Python"],
      age: "18+",
      creator: {
        username: "john_doe",
        code: "INST001",
        institutionName: "Tech University",
        email: "john.doe@example.com",
        "accountType": "admin"
      }
    }
      const course = new Course(courseData);
      await course.save();
      courseStringId = course._id.toString()
      
      const res = await request(app).get('/course/get-course-data').query({ id: courseStringId});
    
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      
      expect(res.body).toHaveProperty('data');
     
      const retrievedCourse = res.body.data;
     

      expect(res.body.data).toHaveProperty('title', 'testFind23500');
      expect(retrievedCourse).toHaveProperty('compleated', false);
      expect(retrievedCourse).toHaveProperty('accepted', false);
      expect(retrievedCourse).toHaveProperty('description', 'python');
      expect(retrievedCourse).toHaveProperty('categories');
      expect(retrievedCourse.categories).toEqual(expect.arrayContaining(["Programming", "Computer Science", "Python"]));
      expect(retrievedCourse).toHaveProperty('age', '18+');
      expect(retrievedCourse).toHaveProperty('creator');
      expect(retrievedCourse.creator).toHaveProperty('username', 'john_doe');
      expect(retrievedCourse.creator).toHaveProperty('code', 'INST001');
      expect(retrievedCourse.creator).toHaveProperty('institutionName', 'Tech University');
      expect(retrievedCourse.creator).toHaveProperty('email', 'john.doe@example.com');
      expect(retrievedCourse.creator).toHaveProperty('accountType', 'admin');
   
  });

  it('should return an error when retrieving a course with an invalid id', async () => {
    const invalidId = new mongoose.Types.ObjectId(); 
  
    const res = await request(app).get('/course/get-course-data').query({ id: invalidId });
  
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
  });

  
  it('should update the course successfully', async () => {
    const course = {
      title: "init Course",
      compleated: false,
      accepted: false,
      description: "python",
      categories: ["Programming", "Computer Science", "Python"],
      age: "18+",
      creator: {
        username: "john_doe",
        code: "INST001",
        institutionName: "Tech University",
        email: "john.doe@example.com",
        "accountType": "admin"
      }
    }
    const courseData = new Course(course);
    await courseData.save();

    const updatedCourseData = courseData;
    updatedCourseData.title = "Updated Course"

    const res = await request(app)
      .post('/course/update-course')
      .send({ data: updatedCourseData });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('title', 'Updated Course');

    // Verify the update in the database
    const updatedCourse = await Course.findById(courseData._id);
    expect(updatedCourse.title).toBe('Updated Course');
  });

  it('Check if nothing is updated when provided something that does not exist in db', async () => {
    const course = {
      _id:new mongoose.Types.ObjectId(),
      title: "init Course",
      compleated: false,
      accepted: false,
      description: "python",
      categories: ["Programming", "Computer Science", "Python"],
      age: "18+",
      creator: {
        username: "john_doe",
        code: "INST001",
        institutionName: "Tech University",
        email: "john.doe@example.com",
        "accountType": "admin"
      }
    }
    const courseData = new Course(course);

    const res = await request(app)
      .post('/course/update-course')
      .send({ data: courseData });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toBeUndefined()
  });

  it('should be duplicate key error when inserting a course with the same primary key id', async () => {
    const courseData = {
        _id:new mongoose.Types.ObjectId(),
        title: "Duplicate Course",
        compleated: false,
        accepted: false,
        description: "python",
        categories: ["Programming", "Computer Science", "Python"],
        age: "18+",
        creator: {
            username: "john_doe",
            code: "INST001",
            institutionName: "Tech University",
            email: "john.doe@example.com",
            accountType: "admin"
        }
    };
    await request(app).post('/course/create-new-course').send(courseData);
    const res = await request(app).post('/course/create-new-course').send(courseData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('success', false); 
});
  
it('Missing required field error', async () => {
  const courseData = {
      _id:new mongoose.Types.ObjectId(),
      compleated: false,
      accepted: false,
      description: "python",
      age: "18+",
      creator: {
          username: "john_doe",
          code: "INST001",
          institutionName: "Tech University",
          email: "john.doe@example.com",
          accountType: "admin"
      }
  };


  const res = await request(app).post('/course/create-new-course').send(courseData);

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('success', false); 
});
    
it('Invalid field type', async () => {
  const courseData = {
      _id:1234,
      title: 1234,
      compleated: false,
      accepted: false,
      description: "python",
      age: "18+",
      creator: {
          username: "john_doe",
          code: "INST001",
          institutionName: "Tech University",
          email: "john.doe@example.com",
          accountType: "admin"
      }
  };

  const res = await request(app).post('/course/create-new-course').send(courseData);

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('success', false); 
});

it('should return an error when creating a course with an empty input', async () => {
  const res = await request(app)
    .post('/course/create-new-course')
    .send({});

  expect(res.status).toBe(500);
});

it('should return courses by a given property', async () => {
  const course1 = new Course({
    title: 'Math 101',
      compleated: false,
      accepted: false,
      description: "python",
      age: "18+",
    creator: {
      username: "teacher1",
      code: "12347",
      institutionName: "Tech University",
      email: "teacher@example.com",
      accountType: "instructor"
  }
  });

  const course2 = new Course({
    title: 'Science 101',
    compleated: false,
      accepted: false,
      description: "python",
      age: "18+",
    creator: {
      username: "teacher1",
      code: "12347",
      institutionName: "Tech University",
      email: "teacher@example.com",
      accountType: "instructor"
  }
  });

  await course1.save();
  await course2.save();

  const res = await request(app)
    .post('/course/get-courses-by-prop')
    .send({ prop: 'title', value: 'Math 101', code: '12347' });

  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toBe(true);
  expect(res.body.res.length).toBeGreaterThan(0);
  expect(res.body.res[0]).toHaveProperty('title', 'Math 101');

});

it('should return courses by a given property:title', async () => {
 await propertyTestFunc('title','Math 101');
});

it('should return courses by a given property:description', async () => {
  await propertyTestFunc('description','python');
 });

 it('should return courses by a given property:age', async () => {
  await propertyTestFunc('age','18+');
 });
 
 it('should return courses by a given property:accepted', async () => {
  await propertyTestFunc('accepted',false);
 });

 it('should return courses by a given property:compleated', async () => {
  await propertyTestFunc('compleated',false);
 });

 it('should return courses by a given property:creator.username', async () => {
  await propertyTestFunc('creator.username','teacher1');
 });

 it('should return courses by a given property:creator.code', async () => {
  await propertyTestFunc('creator.code','12347');
 });

 it('should return courses by a given property:creator.institutionName', async () => {
  await propertyTestFunc('creator.institutionName','Tech University');
 });

 it('should return courses by a given property:creator.email', async () => {
  await propertyTestFunc('creator.email','teacher@example.com');
 });

 it('should return courses by a given property:creator.accountType', async () => {
  await propertyTestFunc('creator.accountType','instructor');
 });
 

it('Should return empty if no prop matches for value field', async () => {
 
  const res = await request(app)
    .post('/course/get-courses-by-prop')
    .send({ prop: 'title', value: 'does not exist', code: '12347' });

  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toBe(true);
  expect(res.body.res).toHaveLength(0);
});
  
it('Should return empty if no prop matches for prop field', async () => {
 
  const res = await request(app)
    .post('/course/get-courses-by-prop')
    .send({ prop: '', value: 'Math', code: '12347' });

  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toBe(true);
  expect(res.body.res).toHaveLength(0);
});

it('Should return courses if code field is not present', async () => {
 
  const course1 = new Course({
    title: 'Math 101',
      compleated: false,
      accepted: false,
      description: "python",
      age: "18+",
    creator: {
      username: "teacher1",
      code: "12347",
      institutionName: "Tech University",
      email: "teacher@example.com",
      accountType: "instructor"
  }
  });

  await course1.save();

  const res = await request(app)
    .post('/course/get-courses-by-prop')
    .send({ prop: 'title', value: 'Math 101'});

  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toBe(true);
  expect(res.body.res.length).toBeGreaterThan(0);
 
});




  
  