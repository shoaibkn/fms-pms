const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    party_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "party_id"
    },
    merchant_nm: {
      type: DataTypes.STRING(155),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "merchant_nm"
    }
  };
  const options = {
    tableName: "merchant",
    comment: "",
    indexes: []
  };
  const MerchantModel = sequelize.define("merchant_model", attributes, options);
  return MerchantModel;
};