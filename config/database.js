require('dotenv').config();
module.exports = {
  //Configuración DB
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || "personal",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql",

    //CONFIGURACIÓN SEEDERS
    seederStorage:"sequelize",
    seederStorageTablename:"seeds",

   //CONFIGURACIÓN MIGRATIONS
   migrationStorage:"sequelize",
   migrationStorageTableName:"migrations"


  }
