const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    g_task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "g_task_id"
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
      unique: "unq_grn_tasks_bill_id"
    },
    bt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bt_id",
      unique: "unq_grn_tasks_bt_id"
    },
    gt_stamp: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "gt_stamp"
    },
    im_stamp: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "im_stamp"
    },
    grn_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "grn_num"
    }
  };
  const options = {
    tableName: "grn_tasks",
    comment: "",
    indexes: []
  };
  const GrnTasksModel = sequelize.define("grn_tasks_model", attributes, options);
  return GrnTasksModel;
};