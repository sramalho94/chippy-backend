process.env.NODE_ENV = 'test'
const { Location } = require('../models')
const { hashPassword } = require('../middleware')
const { User } = require('../models')

describe('Location model tests', () => {
  let testUser
  let testLocation

  beforeAll(async () => {
    try {
      // Create a test user
      testUser = await User.create({
        username: 'testuser',
        passwordDigest: await hashPassword('testpassword')
      })
    } catch (error) {
      console.error('Error creating test user:', error)
    }
  })

  afterAll(async () => {
    try {
      await User.destroy({ where: {}, truncate: { cascade: true } })
      await Location.destroy({ where: {}, truncate: { cascade: true } })
    } catch (error) {
      console.error('Error cleaning up test data:', error)
    }
  })

  test('create a new location', async () => {
    try {
      testLocation = await Location.create({
        street: 'Test Street 1',
        street2: 'Test Street 2',
        city: 'Test City',
        state: 'NJ',
        region: 'Test Region',
        userId: testUser.id
      })

      expect(testLocation).toHaveProperty('id')
      expect(testLocation).toHaveProperty('street', 'Test Street 1')
      expect(testLocation).toHaveProperty('street2', 'Test Street 2')
      expect(testLocation).toHaveProperty('city', 'Test City')
      expect(testLocation).toHaveProperty('state', 'NJ')
      expect(testLocation).toHaveProperty('region', 'Test Region')
      expect(testLocation).toHaveProperty('userId', testUser.id)
    } catch (error) {
      console.error('Error creating location:', error)
    }
  })
})
