
exports.seed = async function (knex) {
  return knex('users').del()
    .then(async function () {
 return await knex('users').insert([
    {
      username: 'jack',
      password: "123",
    },
    {

      username: 'justin',
      password: "123",
    },
    {
      username: 'dylan',
      password: "123",
    },
  ])
  }
    )}
