process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../server');
const { createToken, hashPassword } = require('../middleware');
const { User } = require('../models');
const { Chip } = require('../models');

let testToken;

describe('Chip controller tests', () => {
	let chipId;
	let testUser;
	let testUserId;
	beforeAll(async () => {
		// Create a test user
		testUser = await User.create({
			username: 'testuser',
			passwordDigest: await hashPassword('testpassword')
		});
		testUserId = testUser.id;

		// Log the test user in and get the token
		testToken = createToken({
			id: testUser.id,
			username: testUser.username,
			passwordDigest: testUser.passwordDigest
		});
	});

	test('create chip', async () => {
		const response = await request(app)
			.post('/api/chips')
			.set('Authorization', `Bearer ${testToken}`)
			.send({
				chipName: 'Test Chip',
				brand: 'Test Brand',
				flavor: 'Salt & Vinegar',
				type: 'Potato',
				userId: testUserId
			});

		chipId = response.body.id;

		expect(response.statusCode).toBe(201);
		expect(response.body.chipName).toBe('Test Chip');
		expect(response.body.flavor).toBe('Salt & Vinegar');
		expect(response.body.type).toBe('Potato');
	});

	test('get all chips', async () => {
		const response = await request(app).get('/api/chips');

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body.length).toBeGreaterThan(0);
	});

	// Add more tests for other controllers (GetChipsByUserId, GetChipById, etc.)

	// Get chips by user ID
	test('get chips by user ID', async () => {
		const response = await request(app).get(
			`/api/chips/user/${testUserId}`
		);
		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body.length).toBeGreaterThan(0);
		expect(response.body[0].userId).toBe(testUserId);
	});

	// Get chip by ID
	test('get chip by ID', async () => {
		const response = await request(app).get(`/api/chips/chip/${chipId}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.chipName).toBe('Test Chip');
		expect(response.body.flavor).toBe('Salt & Vinegar');
		expect(response.body.brand).toBe('Test Brand');
		expect(response.body.type).toBe('Potato');
		expect(response.body.userId).toBe(testUserId);
	});

	// Get chips by flavor
	test('get chips by flavor', async () => {
		const response = await request(app).get(
			'/api/chips/flavor/Salt%20&%20Vinegar'
		);

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body.length).toBeGreaterThan(0);
		expect(response.body[0].flavor).toBe('Salt & Vinegar');
	});

	// Get chips by brand
	test('get chips by brand', async () => {
		const response = await request(app).get(
			'/api/chips/brand/Test%20Brand'
		);

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body.length).toBeGreaterThan(0);
		expect(response.body[0].brand).toBe('Test Brand');
	});

	// Get chips by chip name
	test('get chips by chip name', async () => {
		const response = await request(app).get(
			'/api/chips/chip-name/Test Chip'
		);

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body.length).toBeGreaterThan(0);
		expect(response.body[0].chipName).toBe('Test Chip');
	});

	// Update chip
	test('update chip', async () => {
		const response = await request(app)
			.put(`/api/chips/${chipId}`)
			.set('Authorization', `Bearer ${testToken}`)
			.send({
				chipName: 'Updated Test Chip'
			});

		expect(response.statusCode).toBe(200);
		expect(response.body[1][0].chipName).toBe('Updated Test Chip');
	});

	// Delete chip
	test('delete chip', async () => {
		const response = await request(app)
			.delete(`/api/chips/${chipId}`)
			.set('Authorization', `Bearer ${testToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe(
			`Deleted chip with an id of ${chipId}`
		);
	});
	afterAll(async () => {
		try {
			await User.destroy({ where: {}, truncate: { cascade: true } });
			await Chip.destroy({ where: {}, truncate: { cascade: true } });
		} catch (error) {
			console.error('Error cleaning up test data:', error);
		}
	});
});
