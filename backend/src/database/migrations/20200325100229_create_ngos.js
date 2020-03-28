// This migration was created with the cmd command "npx knex migrate:make create_ngos".
// To see the migrations' log, use "npx knex migrate:status".
// To "undo" your latest migration: "npx knex migrate:rollback"
// Help about the commands: "npx knex"

exports.up = function(knex) { // What this migration will do.
  return knex.schema.createTable('ngos', function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('state_abreviation', 2).notNullable();
  })  
};

exports.down = function(knex) { // What to do if the up method fails.
  return knex.schema.dropTable('ngos');
};
