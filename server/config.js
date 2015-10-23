var Promise = require('bluebird');

var knex = require('knex')({
  client: process.env.dbClient || 'postgres',
  connection: {
    host     : process.env.dbHost || '127.0.0.1',
    user     : process.env.dbUser || 'root',
    password : process.env.dbPassword || '',
    database : process.env.dbDatabase || 'iplan',
    charset  : 'utf8'
  }
});

module.exports = db = require('bookshelf')(knex);

db.plugin('registry');

var buildTable = function(name, callback){
  return db.knex.schema.hasTable(name)
  .then(function(exists) {
    if (exists) {
      return { name: name, created: false };
    } else {
      return db.knex.schema.createTable(name, callback);
    }
  })
  .then(function(response){
    if (!response.name){
      qb = response;
      if (qb) {
        return { name: name, created: true };
      } else {
        return { name: name, created: false };
      }
    } else { return response; }
  });
};

var events = buildTable('events', function(table){
  table.increments('id').primary();
  table.string('name').notNullable();
  table.date('date');
});

var places = buildTable('places', function(table){
  table.increments('id').primary();
  table.string('name').notNullable();
  table.integer('votes');
  table.integer('event_id');
});

var users = buildTable('users', function(table){
  table.increments('id').primary();
  table.integer('facebook_id').notNullable();
  table.string('first_name').notNullable();
  table.string('last_name').notNullable();
  table.string('email');
});

var tables = [events, places, users];

Promise.all(tables)
.then(function(tables){
  tables.forEach(function(table){
    if(table.created){
      console.log('Bookshelf: created table', table.name);
    }
    else {
      console.log('Bookshelf:', table.name, 'table already exists');
    };
  });
});
