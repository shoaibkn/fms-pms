const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    merchant_uname: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "merchant_uname"
    },
    merchant_nm: {
      type: DataTypes.STRING(155),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "merchant_nm"
    },
    party_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "party_id"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt"
    },
    modifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "modifiedAt"
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