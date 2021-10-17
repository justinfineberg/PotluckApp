exports.seed = async function (knex) {
  return await knex('parties_items').insert([
    {
      completed: true,
      person_bringing: 'Steve',
      party_id: 1,
      item_id: 1
    },
    {
      completed: false,
      person_bringing: null,
      party_id: 1,
      item_id: 2
    },
    {
      completed: true,
      person_bringing: 'Matthew',
      party_id: 2,
      item_id: 3
    },
    {
      completed: true,
      person_bringing: 'Jenkins',
      party_id: 3,
      item_id: 4
    },
    {
      completed: false,
      person_bringing: null,
      party_id: 3,
      item_id: 5
    }
  ])
};
