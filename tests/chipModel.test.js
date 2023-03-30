// tests/chipModel.test.js
process.env.NODE_ENV = 'test'
const { Chip } = require('../models')
const { sequelize } = require('../models/index')
const { createToken, hashPassword } = require('../middleware')
const { User } = require('../models')

// Declare a variable to store the testUserId
let testUserId

describe('Chip model tests', () => {
  let testUser
  let testChip

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
      await Chip.destroy({ where: {}, truncate: { cascade: true } })
    } catch (error) {
      console.error('Error cleaning up test data:', error)
    }
  })

  // ... the rest of the tests
  test('create a new chip', async () => {
    try {
      testChip = await Chip.create({
        chipName: 'Test Chip',
        brand: 'Test Brand',
        flavor: 'Salt & Vinegar',
        type: 'Potato',
        userId: testUser.id
      })

      expect(testChip).toHaveProperty('id')
      expect(testChip).toHaveProperty('brand', 'Test Brand')
      expect(testChip).toHaveProperty('chipName', 'Test Chip')
      expect(testChip).toHaveProperty('flavor', 'Salt & Vinegar')
      expect(testChip).toHaveProperty('type', 'Potato')
      expect(testChip).toHaveProperty('userId', testUser.id)
    } catch (error) {
      console.error('Error creating test chip:', error)
    }
  })
})
