const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    bm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "bm_id",
    },
    bill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bill_id",
      references: {
        key: "bill_id",
        model: "bill_recv_model",
      },
    },
    store_id: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "store_id",
    },
    po_num: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "po_num",
    },
    store_po: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "store_po",
    },
    material_nm: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "material_nm",
    },
    uom: {
      type: DataTypes.STRING(12),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uom",
    },
    qty: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "qty",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "modifiedat",
    },
  };
  const options = {
    tableName: "bill_receive_dtl",
    comment: "",
    indexes: [
      {
        name: "fk_bill_receive_dtl_bill_recv",
        unique: false,
        type: "BTREE",
        fields: ["bill_id"],
      },
    ],
  };
  const BillReceiveDtlModel = sequelize.define(
    "bill_receive_dtl_model",
    attributes,
    options
  );
  return BillReceiveDtlModel;
};
