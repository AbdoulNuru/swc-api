const dotenv = require("dotenv");

dotenv.config();
const config = {
  development: {
    use_env_variable: "DATABASE_DEV_URL",
    dialect: "postgresql",
  },

  test: {
    use_env_variable: "DATABASE_TEST_URL",
    dialect: "postgresql",
  },

  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgresql",
  },
};
module.exports = config;
