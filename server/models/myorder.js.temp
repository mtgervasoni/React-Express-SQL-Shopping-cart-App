"use strict";
module.exports = (sequelize, DataTypes) => {
  const MyOrder = sequelize.define("MyOrder", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return MyOrder;
};
