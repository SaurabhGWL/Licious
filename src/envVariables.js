const envVariables = {
  // DB configurations
  VERSION: process.env.VERSION || "0.0.1",
  DB_USER: process.env.DB_USER || "developer",
  DB_PASSWORD:process.env.DB_PASSWORD || "awakdb1234",
  DB_HOST: process.env.DB_HOST || "awak-dev-db.cirzdi7ua5lw.ap-southeast-1.rds.amazonaws.com",
  DB_NAME: process.env.DB_NAME || "awak_dev_db",
  DB_SSL: process.env.DB_SSL || true,
  DB_PORT: process.env.DB_PORT || 5432,
  DB_MAX_POOL_SIZE: process.env.DB_MAX_POOL_SIZE || "5",
  //server configurations
  SERVER_PORT: process.env.SERVER_PORT || "5000",
  PORT: process.env.PORT || 5000,
  BODY_LIMIT: process.env.BODY_LIMIT || "100kb",
  CROS_HEADERS: process.env.CROS_HEADERS || ["Link"],

  KAFKA_BROKER_HOST: process.env.KAFKA_BROKER_HOST || "localhost:9092",
  KAFKA_TOPICS_USERS: process.env.KAFKA_TOPICS_USERS || "users",
};
export default envVariables;
