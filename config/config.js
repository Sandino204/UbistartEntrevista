module.exports = {
  
    /** DATABASE */
    db: {
      DB_HOST: "localhost",
      DB_USER: "root",
      DB_PASS: "Caio123$5",
      DB_NAME: "Ubistart",
      dialect: "mysql",
  
      // pool is optional, it will be used for Sequelize connection pool configuration
      pool: {
        max: 25,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
  
    /** AUTH KEY */
    auth: {
      secret: "ubistartSecret"
    }
  };