const { DataTypes } = require("sequelize");
module.exports = async (sequelize) => {
  const attributes = {
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
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
      unique: "unq_courier_out_cid",
      references: {
        key: "cid",
        model: "courier_out",
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
    tableName: "courier_out_dtl",
    comment: "",
    indexes: [],
  };
  const CourierOutDtlModel = sequelize.define(
    "courier_out_dtl_model",
    attributes,
    options
  );

  return CourierOutDtlModel;
};
