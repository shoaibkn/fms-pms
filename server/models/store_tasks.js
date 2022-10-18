const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    s_task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "s_task_id"
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
      unique: "unq_store_tasks_bill_id"
    },
    bt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bt_id",
      unique: "unq_store_tasks_bt_id"
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
    qty_recv: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "qty_recv"
    }
  };
  const options = {
    tableName: "store_tasks",
    comment: "",
    indexes: []
  };
  const StoreTasksModel = sequelize.define("store_tasks_model", attributes, options);
  return StoreTasksModel;
};