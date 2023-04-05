process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../server')
const { createToken, hashPassword } = require('../middleware')
const { User } = require('../models')
const { Location } = require('../models')

let testToken

describe('Location controller tests', () => {
  let locationId
  let testUser
  let testUserId

  beforeAll(async () => {
    testUser = await User.create({
      username: 'testuser',
      passwordDigest: await hashPassword('testpassword')
    })
    testUserId = testUser.id
    testToken = createToken({
      id: testUser.id,
      username: testUser.username,
      passwordDigest: testUser.passwordDigest
    })
  })

  // Create Location
  test('create Location', async () => {
    const response = await request(app)
      .post('/api/locations/post')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        street: 'Test Street 1',
        street2: 'Test Street 2',
        city: 'Test City',
        state: 'NJ',
        region: 'Test Region',
        userId: testUserId
      })

    locationId = response.body.id
    expect(response.statusCode).toBe(200)
    expect(response.body.street).toBe('Test Street 1')
    expect(response.body.street2).toBe('Test Street 2')
    expect(response.body.city).toBe('Test City')
    expect(response.body.state).toBe('NJ')
    expect(response.body.region).toBe('Test Region')
    expect(response.body.userId).toBe(testUserId)
  })

  // Get Location by Id
  test('get Location by ID', async () => {
    const response = await request(app).get(`/api/locations/${testUserId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body[0].street).toBe('Test Street 1')
    expect(response.body[0].street2).toBe('Test Street 2')
    expect(response.body[0].city).toBe('Test City')
    expect(response.body[0].state).toBe('NJ')
    expect(response.body[0].region).toBe('Test Region')
    expect(response.body[0].userId).toBe(testUserId)
  })

  // Update Location
  test('update Location', async () => {
    const response = await request(app)
      .put(`/api/locations/update/${locationId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        street: 'Updated Street'
      })
    expect(response.statusCode).toBe(200)
    expect(response.body[1][0].street).toBe('Updated Street')
  })

  // Delete Location
  test('delete location', async () => {
    const response = await request(app)
      .delete(`/api/locations/delete/${locationId}`)
      .set('Authorization', `Bearer ${testToken}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe(
      `Deleted location with an id of ${locationId}`
    )
  })

  afterAll(async () => {
    try {
      await User.destroy({ where: {}, truncate: { cascade: true } })
      await Location.destroy({ where: {}, truncate: { cascade: true } })
    } catch (error) {
      console.error('Error cleaning up test data:', error)
    }
  })
})
