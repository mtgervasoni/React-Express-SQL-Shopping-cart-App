"use strict";

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      artist: DataTypes.STRING,
      title: DataTypes.STRING,
      label: DataTypes.STRING,
      labelnum: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN
    },
    {}
  );
  Item.associate = function(models) {
    // Item.belongsTo(models.Order, {
    //   foreignKey: "OrderId",
    //   onDelete: "CASCADE"
    // });

    Item.belongsToMany(models.Order, {
      through: "order_details"
      // foreignKey: "ItemId"
    });
  };
  return Item;
};
