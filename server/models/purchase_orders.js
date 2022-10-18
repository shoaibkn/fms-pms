const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    po_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "po_id"
    },
    po_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "po_no"
    },
    fin_year: {
      type: DataTypes.STRING(12),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "fin_year"
    },
    po_typ_cd: {
      type: DataTypes.STRING(12),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "po_typ_cd"
    },
    store_cd: {
      type: DataTypes.STRING(12),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "store_cd"
    },
    supplier: {
      type: DataTypes.STRING(125),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "supplier"
    },
    mat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mat_id"
    },
    nomen1: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nomen1"
    },
    unit_nm: {
      type: DataTypes.STRING(12),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "unit_nm"
    },
    qty: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "qty"
    },
    qty_recv: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "qty_recv"
    },
    po_dt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "po_dt"
    },
    delv_dt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "delv_dt"
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "order_id"
    }
  };
  const options = {
    tableName: "purchase_orders",
    comment: "",
    indexes: []
  };
  const PurchaseOrdersModel = sequelize.define("purchase_orders_model", attributes, options);
  return PurchaseOrdersModel;
};