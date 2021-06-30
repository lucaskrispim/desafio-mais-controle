module.exports = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  batabase: process.env.DATABASE_DATABASE,
  dialect: process.env.DATABASE_DIALECT,
  define: {
    timestamps: process.env.DATABASE_DEFINE_TIMESTAMPS == "true" ? true : false,
    underscored: process.env.DATABASE_DEFINE_UNDERSCORED == "true" ? true : false,
  },
  logging: process.env.DATABASE_LOGGING == "true" ? true : false,
  timezone: process.env.DATABASE_TIMEZONE
}
