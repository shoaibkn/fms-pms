const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "store_id"
    },
    store_nm: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "store_nm"
    },
    store_cd: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "store_cd"
    }
  };
  const options = {
    tableName: "stores_db",
    comment: "",
    indexes: []
  };
  const StoresDbModel = sequelize.define("stores_db_model", attributes, options);
  return StoresDbModel;
};