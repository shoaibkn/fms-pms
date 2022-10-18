const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "uid",
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "username",
    },
    passwd: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "passwd",
    },
    module_ids: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "module_ids",
    },
  };
  const options = {
    tableName: "authn_db",
    comment: "",
    indexes: [],
  };
  const Users = sequelize.define("Users", attributes, options);
  return Users;
};
