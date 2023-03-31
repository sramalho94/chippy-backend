process.env.NODE_ENV = 'test';
const { User } = require('../models');
const { hashPassword } = require('../middleware');

describe('User model tests', () => {
	test('Create a new user', async () => {
		try {
			testUser = await User.create({
				username: 'testuser',
				firstName: 'test',
				lastName: 'user',
				passwordDigest: await hashPassword('testpassword')
			});
			expect(testUser).toHaveProperty('id', testUser.id);
			expect(testUser).toHaveProperty('username', 'testuser');
			expect(testUser).toHaveProperty('firstName', 'test');
			expect(testUser).toHaveProperty('lastName', 'user');
			expect(testUser).toHaveProperty(
				'passwordDigest',
				testUser.passwordDigest
			);
		} catch (error) {
			console.log('Error creating test user: ', error);
		}
	});

	afterAll(async () => {
		try {
			await User.destroy({ truncate: { cascade: true } });
		} catch (error) {
			console.log('Error cleaning up test data: ', error);
		}
	});
});
