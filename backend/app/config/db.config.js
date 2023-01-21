module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Lato2012!",
  DB: "oclassrooms",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
