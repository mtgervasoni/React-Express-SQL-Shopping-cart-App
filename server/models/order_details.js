"use strict";
module.exports = (sequelize, DataTypes) => {
  const order_details = sequelize.define("order_details", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: DataTypes.INTEGER
  });
  order_details.associate = function(models) {
    // order_details.belongsToMany(models.Item, {
    //   through: "order_details"
    //   // foreignKey: "ItemId"
    // });
  };
  return order_details;
};
