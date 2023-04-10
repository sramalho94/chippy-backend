process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../server')
const { createToken, hashPassword } = require('../middleware')
const { User, Chip, Comment } = require('../models')

describe('Comment controller tests', () => {
  let testUser
  let testUserId
  let testChip
  let testChipId
  let commentId

  beforeAll(async () => {
    //create test user
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

    //create chip
    testChip = await Chip.create({
      chipName: 'testChipName',
      flavor: 'testFlavor',
      brand: 'testBrand',
      type: 'testType',
      userId: testUserId
    })
    testChipId = testChip.id
  })

  // create comment
  test('create comment', async () => {
    const response = await request(app)
      .post(`/api/comments/`)
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        userId: testUserId,
        chipId: testChipId,
        comment: 'Test Comment'
      })
    commentId = response.body.id
    expect(response.statusCode).toBe(201)
    expect(response.body.userId).toBe(testUserId)
    expect(response.body.chipId).toBe(testChipId)
    expect(response.body.comment).toBe('Test Comment')
  })

  // get all chip comments and remarks
  test('Get All Comments by Chip ID', async () => {
    const response = await request(app).get(`/api/comments/${testChipId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body[0].userId).toBe(testUserId)
  })

  // update comment
  test('update comment', async () => {
    const response = await request(app)
      .put(`/api/comments/${commentId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        comment: 'Updated Comment'
      })
    expect(response.statusCode).toBe(200)
    expect(response.body[1][0].comment).toBe('Updated Comment')
  })

  // delete comment
  test('delete comment', async () => {
    const response = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set('Authorization', `Bearer ${testToken}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe(
      `Deleted comment with an id of ${commentId}`
    )
  })

  afterAll(async () => {
    try {
      await User.destroy({ truncate: { cascade: true } })
      await Chip.destroy({ truncate: { cascade: true } })
      await Comment.destroy({ truncate: { cascade: true } })
    } catch (error) {
      console.log('Error cleaning up test data:', error)
    }
  })
})
