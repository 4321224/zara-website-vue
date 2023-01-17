'use strict';

/** @type {import('sequelize-cli').Migration} */
const {hashPassword} = require ('../helpers/bcrypt')
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require("../data/user.json");
    // console.log(data);
    data.forEach((el) => {
      el.password = hashPassword(el.password)
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Users", data);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
