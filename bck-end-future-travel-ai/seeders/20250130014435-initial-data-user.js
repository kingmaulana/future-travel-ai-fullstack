'use strict';

const { hashPassword } = require('../helpers/bcyrpt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/users.json')

    data = data.map(el => {
      delete el.id
      el.password = hashPassword(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Users', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  }
};
