const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "module_id"
    },
    module_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "module_name"
    }
  };
  const options = {
    tableName: "modules",
    comment: "",
    indexes: []
  };
  const ModulesModel = sequelize.define("modules_model", attributes, options);
  return ModulesModel;
};