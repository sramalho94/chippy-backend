process.env.Node_ENV = 'test';
const request = require('supertest');
const app = require('../server');
const { createToken, hashPassword } = require('../middleware');

const { User, Chip, ChipReaction } = require('../models');

describe('Chip reaction controller tests', () => {
	let testUser;
	let testChip;
	let testToken;
	let testChipReaction;

	beforeAll(async () => {
		try {
			testUser = await User.create({
				username: 'testuser',
				firstName: 'test',
				lastName: 'user',
				passwordDigest: await hashPassword('testpassword')
			});
			testToken = createToken({
				id: testUser.id,
				username: testUser.username,
				passwordDigest: testUser.passwordDigest
			});
		} catch (error) {
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
	});

	test('Create chip reaction', async () => {
		const response = await request(app)
			.post(`/api/chip-reactions`)
			.set('Authorization', `Bearer ${testToken}`)
			.send({
				userId: testUser.id,
				chipId: testChip.id,
				reactionId: 0
			});
		testChipReaction = response.body;
		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty('id');
		expect(response.body.userId).toBe(testUser.id);
		expect(response.body.chipId).toBe(testChip.id);
		expect(response.body.reactionId).toBe(0);
	});

	test('Get chip reaction by userId', async () => {
		const response = await request(app).get(
			`/api/chip-reactions/${testUser.id}`
		);
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('id');
		expect(response.body.userId).toBe(testUser.id);
		expect(response.body.chipId).toBe(testChip.id);
		expect(response.body.reactionId).toBe(0);
	});

	test('Get chip reaction by chipId', async () => {
		const response = await request(app).get(
			`/api/chip-reactions/${testChip.id}`
		);
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('id');
		expect(response.body.userId).toBe(testUser.id);
		expect(response.body.chipId).toBe(testChip.id);
		expect(response.body.reactionId).toBe(0);
	});

	test('Update chip reaction by chipReactionId', async () => {
		const response = await request(app)
			.put(`/api/chip-reactions/${testChipReaction.id}`)
			.set('Authorization', `Bearer ${testToken}`)
			.send({
				reactionId: 1
			});
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('id');
		expect(response.body.userId).toBe(testUser.id);
		expect(response.body.chipId).toBe(testChip.id);
		expect(response.body.reactionId).toBe(1);
	});

	test('Delete chip reaction by chipReactionId', async () => {
		const response = await request(app)
			.delete(`/api/chip-reactions/${testChipReaction.id}`)
			.set('Authorization', `Bearer ${testToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('message');
	});

	afterAll(async () => {
		try {
			await User.destroy({ truncate: { cascade: true } });
			await Chip.destroy({ truncate: { cascade: true } });
			await ChipReaction.destroy({ truncate: { cascade: true } });
		} catch (error) {
			console.log('Error cleaning up test data: ', error);
		}
	});
});
