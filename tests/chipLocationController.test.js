process.env.Node_Env ='test';
const request = require('supertest');
const app = require('../server')
const{createToken,hashPassword}=require('../middleware')

const {User,Location,Chip}= require('../models')

let testToken

describe('Chip location controller tests',()=>{
    let testUser
    let testUserId
    let testChip
    let testLocation
    let testChipId
    let testLocationId

    beforeAll(async()=>{
        //create test user
        testUser = await User.create({
            username:'testuser',
            passwordDigest: await hashPassword('testpassword')
        })
        testUserId = testUser.id

        //
    })

    afterAll(async()=>{
        try{
            await User.destroy({truncate:{cascade:true}})
            await Chip.destroy({truncate:{cascade:true}})
            await Location.destroy({truncate:{cascade:true}})
        }catch(error){
            console.error('Error cleaning up test data:',error)
        }
    })
})
