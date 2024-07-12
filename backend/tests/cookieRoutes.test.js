const request = require('supertest');
const {app} = require('../server'); 

const { connectToDatabases } = require('../db/connection');

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

describe('Cookie Handlers', () => {
  it('should save a user to cookies', async () => {
    const user = { name: 'John', email: 'john@example.com' };

    const response = await request(app)
      .post('/cookies/save-user')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.res).toBe('Success');
    expect(response.body.data).toEqual(user);
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('should get the user from cookies', async () => {
    const user = { name: 'John', email: 'john@example.com' };

  
    const saveResponse = await request(app)
      .post('/cookies/save-user')
      .send(user);

    const cookies = saveResponse.headers['set-cookie'];

  
    const getResponse = await request(app)
      .get('/cookies/get-user-cookies')
      .set('Cookie', cookies)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(getResponse.body.userData).toEqual(user);
  });

  it('should delete the user cookie', async () => {
    const user = { name: 'John', email: 'john@example.com' };

   
    const saveResponse = await request(app)
      .post('/cookies/save-user')
      .send(user);

    const cookies = saveResponse.headers['set-cookie'];

   
    await request(app)
      .post('/cookies/delete-user-cookie')
      .set('Cookie', cookies)
      .expect(200);

   
    const getResponse = await request(app)
      .get('/cookies/get-user-cookies')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(getResponse.body).toBeNull()
  });
});