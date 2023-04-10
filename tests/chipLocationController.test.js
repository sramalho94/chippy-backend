process.env.Node_ENV = 'test';
const request = require('supertest');
const app = require('../server');
const { createToken, hashPassword } = require('../middleware');

const { User, Location, Chip } = require('../models');

let testToken;

describe('Chip location controller tests', () => {
	let testUser;
	let testUserId;
	let testChip;
	let testLocation;
	let testChipId;
	let testLocationId;
	let testRegion;

	beforeAll(async () => {
		//create test user
		testUser = await User.create({
			username: 'testuser',
			passwordDigest: await hashPassword('testpassword')
		});
		testUserId = testUser.id;
		testToken = createToken({
			id: testUser.id,
			username: testUser.username,
			passwordDigest: testUser.passwordDigest
		});

		//create chip
		testChip = await Chip.create({
			chipName: 'testChipName',
			flavor: 'testFlavor',
			brand: 'testBrand',
			type: 'testType',
			userId: testUserId
		});
		testChipId = testChip.id;

		//create location
		testLocation = await Location.create({
			street: 'testStreet',
			street2: 'testStreet2',
			city: 'testCity',
			state: 'testState',
			region: 'testRegion',
			userId: testUserId
		});
		testLocationId = testLocation.id;
		testRegion = testLocation.region;
	});
	// create chip location
	test('create chip location', async () => {
		const response = await request(app)
			.post(`/api/chip-locations/post`)
			.set('Authorization', `Bearer ${testToken}`)
			.send({
				userId: testUserId,
				chipId: testChipId,
				locationId: testLocationId
			});
		chipLocationId = response.body.id;
		expect(response.statusCode).toBe(201);
		expect(response.body.userId).toBe(testUserId);
		expect(response.body.chipId).toBe(testChipId);
		expect(response.body.locationId).toBe(testLocationId);
	});
	// Get chip location by userId
	test('Get Chip Location By User Id', async () => {
		const response = await request(app).get(
			`/api/chip-locations/user/${testUserId}`
		);
		expect(response.statusCode).toBe(200);
		expect(response.body[0].userId).toBe(testUserId);
	});
	// Get Chip Location by region
	test('Get Chip Location By Region', async () => {
		const response = await request(app).get(
			`/api/chip-locations/region/${testRegion}`
		);
		expect(response.statusCode).toBe(200);
		expect(response.body[0].region).toBe(testRegion);
	});
	afterAll(async () => {
		try {
			await User.destroy({ truncate: { cascade: true } });
			await Chip.destroy({ truncate: { cascade: true } });
			await Location.destroy({ truncate: { cascade: true } });
		} catch (error) {
			console.log('Error cleaning up test data:', error);
		}
	});
});
