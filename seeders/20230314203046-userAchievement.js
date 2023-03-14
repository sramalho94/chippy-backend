'use strict';
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const userAchievements = [...Array(100)].map(() => ({
      userId: falso.randNumber({min: 1, max: 100}),
      achievementId: falso.randNumber({min:1, max:5}),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('user_achievements', userAchievements, {})
  },   

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_achievements')
  }
};
