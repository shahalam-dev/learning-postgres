const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Sharif;123",
  host: "localhost",
  port: 7427,
  database: "pg_todos",
});

module.exports = pool;
