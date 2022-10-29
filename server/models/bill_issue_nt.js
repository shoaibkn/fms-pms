const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    bi_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "bi_id",
      references: {
        key: "bt_id",
        model: "store_tasks_model"
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "timestamp"
    },
    bill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bill_id",
      unique: "unq_bill_issue_nt_bill_id",
      references: {
        key: "bill_id",
        model: "bill_recv_model"
      }
    },
    issuer_nm: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "issuer_nm"
    },
    issued_to: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "issued_to"
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
    tableName: "bill_issue_nt",
    comment: "",
    indexes: []
  };
  const BillIssueNtModel = sequelize.define("bill_issue_nt_model", attributes, options);
  return BillIssueNtModel;
};