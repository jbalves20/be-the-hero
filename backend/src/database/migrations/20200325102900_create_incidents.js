exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    table.increments(); // Creates an auto incremental id.
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.string('ngo_id').notNullable(); // References 'ngos' table.
    table.foreign('ngo_id').references('id').inTable('ngos'); // Creates the foreign key.
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
