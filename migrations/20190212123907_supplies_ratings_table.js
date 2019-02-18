/* eslint-disable linebreak-style */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('supplies', function(t) {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('description').notNullable();
    t.string('imageUrl').notNullable();
    t.integer('quantity').notNullable();
  })
      .createTable('ratings', function(t) {
        t.increments('id').primary();
        t.string('user').notNullable();
        t.integer('rating').notNullable();
        t.integer('supplies_id').unsigned()
            .references('supplies.id');
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('supplies').dropTable('ratings');
};
