let config = {
  dbOptions: {
    database: "vrd_app",
    username: "shoaibkn",
    password: "keepcalm",
    dialect: "mysql",
    dialectModule: require("mysql2"),
    host: "192.168.1.43",
    port: 3306,
    logging: false,
  },
  options: {
    type: "js",
    dir: "models",
  },
};

module.exports = config;
