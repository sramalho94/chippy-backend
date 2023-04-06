process.env.NODE_ENV ='test';
const request = require('supertest');
const app = require('../server');
const {createToken,hashPassword}=require('../middleware');
const {User}=require('../models');


describe('User controller test',()=>{

    let testUser;
    let testToken;
    let testUserId

    beforeAll(async()=>{
        //Create a test user
        testUser= await User.create({
            username:'testuser',
            passwordDigest: await hashPassword('testpassword'),
            firstName: 'testName',
            lastName: 'coolRanch'
        })
        testUserId = testUser.id

        // log the test user in and get the token

        testToken = createToken({
            id:testUser.id,
            username: testUser.username,
            passwordDigest: testUser.passwordDigest
        })
    })

    test('get user by id', async()=>{
        const response = await request(app)
        .get(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${testToken}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.username).toBe('testuser')
        expect(response.body.passwordDigest).toBe(testUser.passwordDigest)
        expect(response.body.firstName).toBe('testName')
        expect(response.body.lastName).toBe('coolRanch')
        
    })

    test('update user', async()=>{
        const response = await request(app)
        .put(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${testToken}`)
        .send({
            username: 'update username',
            lastName: 'update lastName',
            firstName: 'update firstName'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body[1][0].username).toBe('update username')
        expect(response.body[1][0].lastName).toBe('update lastName')
        expect(response.body[1][0].firstName).toBe('update firstName')

    })

    test('delete user', async()=>{
        const response = await request(app)
        .delete(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${testToken}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe(`Deleted user with an id of ${testUserId}`)
    })

    afterAll(async ()=>{
        try{
            await User.destroy({truncate:{cascade:true}})
        }
        catch(error){
            console.error('Error cleaning up test data', error)
        }
    })
})


