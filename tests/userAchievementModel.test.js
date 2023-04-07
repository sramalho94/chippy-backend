process.env.NODE_ENV = 'test';
const { User, UserAchievements, Achievement } = require('../models');
const { hashPassword } = require('../middleware');

describe('User achievement model tests', () => {
	let testUser;
	let testAchievement;
	let testUserAchievement;

	beforeAll(async () => {
		try {
			testUser = await User.create({
				username: 'testuser',
				firstName: 'test',
				lastName: 'user',
				passwordDigest: await hashPassword('testpassword')
			});
		} catch (error) {
			console.error('Error creating test user:', error);
		}

		try {
			testAchievement = await Achievement.create({
				name: 'testachievement',
				icon: 'testicon',
				description: 'testdescription'
			});
		} catch (error) {
			console.error('Error creating test achievement:', error);
		}
	});

	test('Create a user achievement', async () => {
		try {
			testUserAchievement = await UserAchievements.create({
				userId: testUser.id,
				achievementId: testAchievement.id
			});

			expect(testUserAchievement).toHaveProperty('id');
			expect(testUserAchievement).toHaveProperty('userId', testUser.id);
			expect(testUserAchievement).toHaveProperty(
				'achievementId',
				testAchievement.id
			);
		} catch (error) {
			console.error('Error creating test user achievement:', error);
		}
	});

	afterAll(async () => {
		try {
			await UserAchievements.destroy({ truncate: { cascade: true } });
			await User.destroy({ truncate: { cascade: true } });
			await Achievement.destroy({ truncate: { cascade: true } });
		} catch (error) {
			console.error('Error cleaning up test data:', error);
		}
	});
});
