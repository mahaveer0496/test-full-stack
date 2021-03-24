const { Pool } = require('pg')

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_db',
  password: '5127',
  port: 5432,
})

db.on('error', ()=>{
  console.error('Could not connect to DB')
  process.exit(-1)
})


module.exports = db