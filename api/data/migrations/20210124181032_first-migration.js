exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('parties', table=>{
      table.increments('party_id')
      table.string('date')
      table.string('time')
      table.string('location')
      table.string('party_url_string').unique()
      table.integer('user_id')
        .unsigned()
        .notNullable() // debatable
        .references('user_id')
        .inTable('users')
        //.onUpdate('CASCADE') // you don't have to worry about this
       //.onDelete('CASCADE')
    })
    .createTable('parties_items', table=>{
      table.increments('party_item_id')
      table.boolean('completed').notNullable()
      table.string('person_bringing')
      table.integer('party_id')
        .unsigned()
        .notNullable() // debatable
        .references('party_id')
        .inTable('parties')
        .onUpdate('CASCADE') // you don't have to worry about this
        .onDelete('CASCADE')
      table.string('item_name').notNullable()
    })
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('parties_items')
  .dropTableIfExists('parties')
  .dropTableIfExists('users')
}
