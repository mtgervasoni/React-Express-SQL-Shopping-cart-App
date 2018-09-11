"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log("inserting....");
    return queryInterface.bulkInsert("Customers", [
      {
        name: "user1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "user2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
