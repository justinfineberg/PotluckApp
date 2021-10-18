exports.seed = async function (knex) {
  return knex('parties_items').del()
    .then(async function () {
  return await knex('parties_items').insert([
    {
      completed: true,
      person_bringing: 'Steve',
      party_id: 29,
      item_name: 'Tequila'
    },
    {
      completed: false,
      person_bringing: null,
      party_id: 30,
      item_name: 'Chips'
    },
    {
      completed: true,
      person_bringing: 'Matthew',
      party_id: 31,
      item_name: 'Spinach'
    },
    {
      completed: true,
      person_bringing: 'Jenkins',
      party_id: 29,
      item_name: 'Limes'
    },
    {
      completed: false,
      person_bringing: null,
      party_id: 30,
      item_name: 'shrimp'
    }
  ])
}
    )}
