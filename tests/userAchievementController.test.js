process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../server')
const { createToken, hashPassword } = require('../middleware')
const { UserAchievements, User, Achievement } = require('../models')

let testToken

describe('UserAchievement controller tests', () => {
  let testUserAchievement
  let userAchievementId
  let testAchievement
  let testAchievementId
  let testUser
  let testUserId
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

    //create a test achievement
    testAchievement = await Achievement.create({
      name: 'testachievement',
      icon: 'testIcon',
      description: 'testDescription'
    })
    testAchievementId = testAchievement.id
    
    testUserAchievement = await UserAchievements.create({
      userId: testUserId,
      achievementId: testAchievementId
    })

  })

  test('create user achievement', async () => {
    const response = await request(app)
    .post('/api/user-achievements')
    .set('Authorization', `Bearer ${testToken}`)
    .send({
      userId: testUserId,
      achievementId: testAchievementId,
      passwordDigest: testUser.passwordDigest
    })
    userAchievementId = response.body.id

    expect(response.statusCode).toBe(200)
    expect(response.body.userId).toBe(testUserId)
    expect(response.body.achievementId).toBe(testAchievementId)
  })

  test('get user achievements by user id', async () => {
    const response = await request(app)
    .get(`/api/user-achievements/${testUserId}`)
    console.log(response)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0].id).toBe(testUser.id)
    expect(response.body[0].user_achievements[0].id).toBe(testAchievement.id)
  })
  afterAll(async () => {
    try {
      await User.destroy({truncate: { cascade: true}})
      await Achievement.destroy({ truncate: { cascade: true}})
      await UserAchievements.destroy({ truncate: { cascade: true}})
    } catch(error) {
      console.error('Error cleaning up test data:', error)
    }
  })
})