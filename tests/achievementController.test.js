process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../server')
const { createToken, hashPassword } = require('../middleware')
const { Achievement, User } = require('../models')

let testToken

describe('Achievement controller tests', () => {
  let testUser
  let testUserId
  let achievement
  let achievementId

  beforeAll(async () => {
    //create a test user
    testUser = await User.create({
      username: 'testuser',
      passwordDigest: await hashPassword('testpassword')  
    })
    testUserId = testUser.id

    //Login test user and get token
    testToken = createToken({
      id: testUserId,
      username: testUser.username,
      passwordDigest: testUser.passwordDigest
    })
  })

  test('create achievement', async () => {
    const response = await request(app)
    post('/api/achievements')
    .set('Authorization', `Bearer ${testToken}`)
    .send({
      name: 'test achievement',
      icon: 'test icon',
      description: 'test description'
    });
    achievementId = response.body.id

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('test achievement')
    expect(response.body.icon).toBe('test icon')
    expect(response.body.description).toBe('test description')
  })

  test('get all achievements', async ()=> {
    const response = await request(app).get('/api/achievements');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0)
  });

  afterAll(async () => {
    try {
      await User.destroy({truncate: {cascade:true}})
      await Achievement.destroy({truncate: {cascade:true}})
    } catch (error) {
      console.error('Error cleaning up test data: ', error)
    }
  })
})