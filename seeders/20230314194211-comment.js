'use strict'
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const comments = [...Array(400)].map(() => ({
      userId: falso.randNumber({ min: 1, max: 100 }),
      chipId: falso.randNumber({ min: 1, max: 100 }),
      comment: falso.randSentence(),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('comments', comments, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments')
  }
}
