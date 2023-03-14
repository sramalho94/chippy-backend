'use strict';
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const achievements = [...Array(5)].map(() => ({
      name: falso.randProductAdjective(),
      icon: falso.randColor(),
      description: falso.randProductDescription({ length: 10}),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('achievements', achievements, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('achievements')
  }
};
