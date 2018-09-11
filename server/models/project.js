"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      title: DataTypes.STRING
    },
    {}
  );
  Project.associate = function(models) {
    Project.belongsToMany(models.User, { through: models.UserProject });
  };
  return Project;
};
