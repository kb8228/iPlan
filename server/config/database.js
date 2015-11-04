var Promise = require('bluebird');

var knex = require('knex')({
  client: process.env.dbClient || 'postgres',
  connection: process.env.DATABASE_URL || {
    host     : process.env.dbHost || 'localhost',
    host     : process.env.dbHost || '127.0.0.1',
    user     : process.env.dbUser || 'root',
    password : process.env.dbPassword || 'ok',
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
  table.string('name');
  table.date('date');
  table.timestamp('created_at');
  table.timestamp('updated_at');
  table.timestamp('time');
  table.timestamp('cutoff');
  table.string('location');
  table.string('code').notNullable();
});

var places = buildTable('places', function(table){
  table.increments('id').primary();
  table.string('name').notNullable();
  table.string('address').notNullable();
  table.string('rating_img');
  table.string('url');
  table.string('category');
  table.string('snippet');
  table.string('location');
  table.integer('votes');
  table.integer('event_id');
});

var users = buildTable('users', function(table){
  table.increments('id').primary();
  table.string('facebook_id');
  table.string('name');
  table.string('email').unique().notNullable();
  table.string('picture');
});

var eventsUsers = buildTable('events_users', function(table){
  table.increments('id').primary();
  table.integer('event_id').notNullable();
  table.string('event_code').notNullable();
  table.integer('user_id').notNullable();
  table.string('email').notNullable();
  table.string('user_role').notNullable();
  table.boolean('voted');
});

var tables = [events, places, users, eventsUsers];

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
