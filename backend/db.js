const { Pool } = require('pg')

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: '5127',
  port: 5432,
})

module.exports = db