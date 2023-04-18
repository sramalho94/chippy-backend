process.env.NODE_ENV='test'
const request = require('supertest');
const app = require('../server');
const { createToken, hashPassword } = require('../middleware');
const {CommentRemark,User,Chip,Comment} = require('../models');



describe( 'Comment Remark Model Controller Test', ()=>{
    let testComment;
    let testCommentId;
    let testRemark;
    let testRemarkId;
    let testUser;
    let testChip;
    let testToken
    let testUserId
    let testCommentRemarkId

beforeAll(async()=>{
   //Create User
        testUser = await User.create({
            username: 'testuser',
            firstName: 'test',
            lastName: 'user',
            passwordDigest: await hashPassword('testpassword')
        });
        testUserId = testUser.id;
		testToken = createToken({
			id: testUser.id,
			username: testUser.username,
			passwordDigest: testUser.passwordDigest
		});
     
   // Creae Chip
        testChip = await Chip.create({
            chipName: 'testChipName',
            flavor: 'testFlavor',
            brand: 'testBrand',
            type: 'testType',
            userId: testUser.id
        });
    
    //Create Comment
        testComment = await Comment.create({
          userId: testUser.id,
          chipId: testChip.id,
          comment: 'Hey Test Comment wowlol'
        })
        testCommentId = testComment.id

        //Create Remark
        testRemark = await Comment.create({
            userId: testUser.id,
            chipId: testChip.id,
            comment: 'Hey Test Comment wowlol this is what I think'
          })
          testRemarkId = testRemark.id
      
    
})
// Create Comment Remark
test('Create a comment remark', async ()=>{
    const response = await request(app)
        .post('/api/comment-remarks')
        .set('Authorization',`Bearer ${testToken}`)
        .send({
            commentId:testCommentId,
            remarkId: testRemarkId
        })
        
        testCommentRemarkId=response.body.id
        expect(response.statusCode).toBe(201)
        expect(response.body.commentId).toBe(testCommentId)
        expect(response.body.remarkId).toBe(testRemarkId)
})
// Update Comment Remark
test('Update comment Remark', async()=>{
    const response = await request(app)
    .put(`/api/comment-remarks/${testCommentRemarkId}`)
    .set('Authorization',`Bearer ${testToken}`)
    .send({
        commentId:testCommentId,
        remarkId:testRemarkId
    })
    console.log(response.body)
    expect(response.statusCode).toBe(200)
    expect(response.body[1][0].commentId).toBe(testCommentId)
    expect(response.body[1][0].remarkId).toBe(testRemarkId)
 })
   // delete comment Remark
   test('delete comment remark', async () => {
    const response = await request(app)
      .delete(`/api/comment-remarks/${testCommentRemarkId}`)
      .set('Authorization', `Bearer ${testToken}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe(
         `Deleted Comment Remark with an id of ${testCommentRemarkId}`
    )
  })

afterAll(async()=>{
    try{
        await User.destroy({where:{},
        truncate:{cascade:true}})
        await Chip.destroy({where:{},
        truncate:{cascade:true}})
        await Comment.destroy({where:{},
        trucate:{cascade:true}})
        await CommentRemark.destroy({where:{},
        truncate:{cascade:true}})
    }
    catch(error){
        console.error('Error cleaning up test data:',error)
    }
})
})