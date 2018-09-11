"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserProduct = sequelize.define("userProduct", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  });
  return UserProduct;
};
