"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define(
    "UserProject",
    {
      quantity: DataTypes.INTEGER
    },
    {}
  );

  UserProject.associate = function(models) {};
  return UserProject;
};
