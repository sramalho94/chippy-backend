'use strict';
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const chipReactions = [...Array(100)].map(() => ({
      userId: falso.randNumber({ min: 1, max: 100}),
      chipId: falso.randNumber({ min: 1, max: 100}),
      reactionId: falso.randNumber({ min: 1, max: 2}),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('chip_reactions', chipReactions, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chip_reactions')
  }
};
