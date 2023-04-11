process.env.NODE_ENV = 'test'
const { User, Chip, Comment, CommentRemark } = require('../models')
const { hashPassword } = require('../middleware')

describe('Comment Remark model tests', () => {
  let testComment;
  let testCommentId;
  let testRemark;
  let testRemarkId;
  let testUser;
  let testChip;

  beforeAll(async () => {
    try {
      testUser = await User.create({
				username: 'testuser',
				firstName: 'test',
				lastName: 'user',
				passwordDigest: await hashPassword('testpassword') 
    });
  } catch(error) {
    console.error('Error creating test user: ', error);
  }
  try {
    testChip = await Chip.create({
      chipName: 'testChipName',
				flavor: 'testFlavor',
				brand: 'testBrand',
				type: 'testType',
				userId: testUser.id
    });
  } catch (error) {
    console.error('Error creating test chip: ', error);
  }
  try {
    testComment = await Comment.create({
      userId: testUser.id,
      chipId: testChip.id,
      comment: 'Hey Test Comment wowlol'
    })
    testCommentId = testComment.id
  } catch (error) {
    console.error('Error creating test comment:', error);
  }
});

test('Create a comment remark', async () => {
  try {
    testRemark = await CommentRemark.create({
      commentId: testCommentId
    });
     testRemarkId = testRemark.id

     expect(testRemark).toHaveProperty('id');
     expect(testRemark).toHaveProperty('commentId', testCommentId);
     expect(testRemark).toHaveProperty('remarkId', testRemarkId);
  } catch (error) {
    console.error('Error creating test comment remark:', error);
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
  });
});