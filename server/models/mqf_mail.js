const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    mqf_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mqf_id",
      unique: "unq_mqf_mail_mqf_id"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "email"
    },
    img_links: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "img_links"
    },
    mail_body: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mail_body"
    }
  };
  const options = {
    tableName: "mqf_mail",
    comment: "",
    indexes: []
  };
  const MqfMailModel = sequelize.define("mqf_mail_model", attributes, options);
  return MqfMailModel;
};