process.env.Node_ENV = 'test';
const { createToken, hashPassword } = require('../middleware');
const { User, Chip, ChipReaction } = require('../models');

describe('Chip reaction model test', () => {
	let testUser;
	let testChip;
	let testChipReaction;

	beforeAll(async () => {
		try {
			testUser = await User.create({
				username: 'testuser',
				firstName: 'test',
				lastName: 'user',
				passwordDigest: await hashPassword('testpassword')
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

	test('Create a new chip reaction', async () => {
		testChipReaction = await ChipReaction.create({
			userId: testUser.id,
			chipId: testChip.id,
			reactionId: 0
		});

		expect(testChipReaction).toHaveProperty('id');
		expect(testChipReaction).toHaveProperty('userId', testUser.id);
		expect(testChipReaction).toHaveProperty('chipId', testChip.id);
		expect(testChipReaction).toHaveProperty;
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
