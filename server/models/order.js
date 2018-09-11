"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "Customers",
        key: "id"
      }
    }
  });
  Order.associate = function(models) {
    Order.belongsToMany(models.Item, {
      through: "order_details"
    });
  };
  return Order;
};
