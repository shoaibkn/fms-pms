const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW(),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "timestamp",
    },
    cmid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "cmid",
    },
    cid: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      autoIncrement: false,
      comment: null,
      field: "cid",
      references: {
        key: "cid",
        model: "courier_in",
      },
    },
    material_nm: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "material_nm",
    },
    material_uom: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "material_uom",
    },
    material_qty: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "material_qty",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updatedAt",
    },
  };
  const options = {
    tableName: "courier_in_dtl",
    comment: "",
    indexes: [
      {
        name: "fk_courier_in_dtl_courier_in",
        unique: false,
        fields: ["cid"],
      },
    ],
  };
  const CourierInDtlModel = sequelize.define(
    "courier_in_dtl_model",
    attributes,
    options
  );
  return CourierInDtlModel;
};
