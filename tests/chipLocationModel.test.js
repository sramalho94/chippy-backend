process.env.Node_ENV = 'test';
const { createToken, hashPassword } = require('../middleware');
const { User, Location, Chip, ChipLocation } = require('../models');

describe('Chip location model test', () => {
	let testUser;
	let testChip;
	let testLocation;
	let testChipLocation;

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
		try {
			testLocation = await Location.create({
				street: 'testStreet',
				street2: 'testStreet2',
				city: 'testCity',
				state: 'testState',
				region: 'testRegion',
				userId: testUser.id
			});
		} catch (error) {
			console.error('Error creating test location:', error);
		}
	});

	test('Create a new chip location', async () => {
		try {
			testChipLocation = await ChipLocation.create({
				userId: testUser.id,
				chipId: testChip.id,
				locationId: testLocation.id
			});
		} catch (error) {
			console.error('Error creating test chip location:', error);
		}
	});

	afterAll(async () => {
		try {
			await User.destroy({ truncate: { cascade: true } });
			await Chip.destroy({ truncate: { cascade: true } });
			await Location.destroy({ truncate: { cascade: true } });
			await ChipLocation.destroy({ truncate: { cascade: true } });
		} catch (error) {
			console.log('Error cleaning up test data: ', error);
		}
	});
});
