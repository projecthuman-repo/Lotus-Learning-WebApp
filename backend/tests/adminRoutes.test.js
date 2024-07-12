
const request = require('supertest');
const { app } = require('../server'); // Adjust the path as necessary
const { connectToDatabases} = require('../db/connection');
const User = require('../models/User'); // Adjust the path as necessary


beforeAll(async () => {
    await connectToDatabases();
    port = 0;
    server = app.listen(port, () => {
  
    });
  });
  
  afterAll(async () => {
    await User.deleteMany({ username: 'testdummy5' });
    await User.deleteMany({ username: 'testdummy7' });
    await User.deleteMany({ username: 'testinstructor'});
    await User.deleteMany({ username: 'testdummy11' });
    await User.deleteMany({ username: 'testdummy111' });
    await User.deleteMany({ username: 'testinstructor1'});
    if (server) {
      await server.close();
    }
  });

  it('should return students based on institution code', async () => {

    await User.insertMany([
        {
          email: 'Test@jtefsfesDEDEsTESTefesfesfsefTESTsefesfffJESTstestestsdfa3#faril55.com',
          username: 'testdummy5',
          password: 'adsghtwy7',
          accountType: 'student',
          institution: { code: 'ABC123' }
        },
        {
            email: 'Test@astringfsfa3#faril55.com',
            username: 'testdummy7',
            password: 'adsghtwy7',
            accountType: 'student',
            institution: { code: 'ABC123' }
          },
          {
          email: 'Test@instructor.com',
          username: 'testinstructor',
          password: 'password12',
          accountType: 'instructor',
          institution: { code: 'ABC123' }
        }
      ]);
    const res = await request(app)
      .post('/admin/get-students')
      .send({ code: 'ABC123' }, {accountType: 'student'});

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    const user1 = res.body.data.find(user => user.username === 'testdummy5');
    const user2 = res.body.data.find(user => user.username === 'testdummy7');
    const user3 = res.body.data.find(user => user.username === 'testinstructor');
    expect(user3).toBeUndefined();
    expect(user1).toBeDefined();
    expect(user1).toHaveProperty('username', 'testdummy5');
    expect(user1).toHaveProperty('institution.code', 'ABC123');
    expect(user2).toBeDefined();
    expect(user2).toHaveProperty('username', 'testdummy7');
    expect(user2).toHaveProperty('institution.code', 'ABC123');
  });

  it('should return no students for a non-existent institution code', async () => {
    const res = await request(app)
      .post('/admin/get-students')
      .send({ code: 'ThisisaBadCode' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveLength(0); 
  });

  it('should return teachers based on institution code', async () => {

    await User.insertMany([
        {
          email: 'Test@TESTjtefsfesDEDaril55.com',
          username: 'testdummy11',
          password: 'adsghtwy7',
          accountType: 'instructor',
          institution: { code: 'ABC122' }
        },
        {
            email: 'Test@TESTastringfsfa3#faril55.com',
            username: 'testdummy111',
            password: 'adsghtwy7',
            accountType: 'instructor',
            institution: { code: 'ABC122' }
          },
          {
          email: 'Test@TESTinstructor.com',
          username: 'testinstructor1',
          password: 'password12',
          accountType: 'student',
          institution: { code: 'ABC122' }
        }
      ]);
    const res = await request(app)
      .post('/admin/get-teachers')
      .send({ code: 'ABC122' }, {accountType: 'instructor'});

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    const user1 = res.body.data.find(user => user.username === 'testdummy11');
    const user2 = res.body.data.find(user => user.username === 'testdummy111');
    const user3 = res.body.data.find(user => user.username === 'testinstructor1');
    expect(user3).toBeUndefined();
    expect(user1).toBeDefined();
    expect(user1).toHaveProperty('username', 'testdummy11');
    expect(user1).toHaveProperty('institution.code', 'ABC122');
    expect(user2).toBeDefined();
    expect(user2).toHaveProperty('username', 'testdummy111');
    expect(user2).toHaveProperty('institution.code', 'ABC122');
  });

  it('should return no teachers for a non-existent institution code', async () => {
    const res = await request(app)
      .post('/admin/get-teachers')
      .send({ code: 'ThisisaBadCode' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveLength(0); 
  });

