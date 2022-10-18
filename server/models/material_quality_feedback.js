const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    mqf_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "mqf_id",
      references: {
        key: "mqf_id",
        model: "mqf_mail_model"
      }
    },
    bm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "bm_id",
      unique: "unq_material_quality_feedback_bm_id"
    },
    pi_num: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "pi_num"
    },
    sole_col: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sole_col"
    },
    sole_fin: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sole_fin"
    },
    heel_fin: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "heel_fin"
    },
    vineer_fin: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "vineer_fin"
    },
    welt_fin: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "welt_fin"
    },
    sole_thk: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sole_thk"
    },
    insole_thk: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "insole_thk"
    },
    hardness: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "hardness"
    },
    brand_sz: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "brand_sz"
    },
    branding_lg: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "branding_lg"
    },
    qty_recv: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "qty_recv"
    },
    ref_av: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ref_av"
    },
    approved_by: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "approved_by"
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "remarks"
    },
    mat_img: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "mat_img"
    }
  };
  const options = {
    tableName: "material_quality_feedback",
    comment: "",
    indexes: []
  };
  const MaterialQualityFeedbackModel = sequelize.define("material_quality_feedback_model", attributes, options);
  return MaterialQualityFeedbackModel;
};