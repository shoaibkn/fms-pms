let config = {
  dbOptions: {
    database: "vrd_app",
    username: "root",
    password: "Vrd@1234",
    dialect: "mysql",
    dialectModule: require("mysql2"),
    host: "127.0.0.1",
    port: 3306,
    logging: false,
  },
  options: {
    type: "js",
    dir: "models",
  },
};

module.exports = config;
