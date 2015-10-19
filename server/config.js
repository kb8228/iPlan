var knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'iplan',
    charset  : 'utf8'
  }
});