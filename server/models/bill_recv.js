const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const attributes = {
    bill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "bill_id",
      references: {
        key: "bill_id",
        model: "store_tasks_model",
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "timestamp",
    },
    bill_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bill_num",
    },
    supplier_nm: {
      type: DataTypes.STRING(55),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "supplier_nm",
    },
    bill_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bill_date",
    },
    bill_amt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bill_amt",
    },
  };
  const options = {
    tableName: "bill_recv",
    comment: "",
    indexes: [],
  };
  const BillRecvModel = sequelize.define("BillRecvModel", attributes, options);
  return BillRecvModel;
};
