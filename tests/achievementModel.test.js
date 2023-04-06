process.env.NODE_ENV = 'test';
const { Achievement } = require('../models');

describe('Achievement model tests', () => {
	let testAchievement;
	afterAll(async () => {
		try {
			await Achievement.destroy({ truncate: { cascade: true } });
		} catch (error) {
			console.error('Error cleaning up test data:', error);
		}
	});
	test('create a new achievement', async () => {
		try {
			testAchievement = await Achievement.create({
				name: 'Test Name',
				icon: 'Test Icon',
				description: 'Test Description'
			});
			expect(response.statusCode).toBe(201);
			expect(testAchievement).toHaveProperty('id');
			expect(testAchievement).toHaveProperty('name', 'Test Name');
			expect(testAchievement).toHaveProperty('icon', 'Test Icon');
			expect(testAchievement).toHaveProperty(
				'description',
				'Test Description'
			);
		} catch (error) {
			console.error('Error creating achievement:', error);
		}
	});
});
