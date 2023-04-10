process.env.NODE_ENV = 'test'
const { Chip, User, Comment } = require('../models')
const { hashPassword } = require('../middleware')

describe('Comment model tests', () => {
  let testUser
  let testUserId
  let testChip
  let testChipId

  beforeAll(async () => {
    try {
      testUser = await User.create({
        username: 'testuser',
        passwordDigest: await hashPassword('testpassword')
      })
    } catch (error) {
      console.error('Error creating test user:', error)
    }
    testUserId = testUser.id

    try {
      testChip = await Chip.create({
        chipName: 'Test Chip',
        brand: 'Test Brand',
        flavor: 'Salt & Vinegar',
        type: 'Potato',
        userId: testUserId
      })
    } catch (error) {
      console.error('Error creating test user:', error)
    }
    testChipId = testChip.id
  })

  test('create a new comment', async () => {
    try {
      testComment = await Comment.create({
        userId: testUserId,
        chipId: testChipId,
        comment: 'Test Comment'
      })
      expect(testComment).toHaveProperty('id')
      expect(testComment).toHaveProperty('userId', testUserId)
      expect(testComment).toHaveProperty('chipId', testChipId)
      expect(testComment).toHaveProperty('comment', 'Test Comment')
    } catch (error) {
      console.error('Error creating test chip:', error)
    }
  })

  afterAll(async () => {
    try {
      await User.destroy({ where: {}, truncate: { cascade: true } })
      await Chip.destroy({ where: {}, truncate: { cascade: true } })
      await Comment.destroy({ where: {}, truncate: { cascade: true } })
    } catch (error) {
      console.error('Error cleaning up test data:', error)
    }
  })
})
