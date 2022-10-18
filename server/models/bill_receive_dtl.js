const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    bm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "bm_id",
      references: {
        key: "bm_id",
        model: "passing_rej_model"
      }
    },
    bill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bill_id",
      unique: "unq_bill_receive_dtl_bill_id"
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "store_id"
    },
    po_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "po_num"
    },
    store_po: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "store_po"
    },
    material_nm: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "material_nm"
    },
    uom: {
      type: DataTypes.STRING(12),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uom"
    },
    qty: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "qty"
    }
  };
  const options = {
    tableName: "bill_receive_dtl",
    comment: "",
    indexes: []
  };
  const BillReceiveDtlModel = sequelize.define("bill_receive_dtl_model", attributes, options);
  return BillReceiveDtlModel;
};