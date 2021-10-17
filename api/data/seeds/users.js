
exports.seed = async function (knex) {
 return await knex('users').insert([
    {
      user_id: 1,
      username: 'jack',
      password: "123",
    },
    {
      user_id: 2,
      username: 'justin',
      password: "123",
    },
    {
      user_id: 3,
      username: 'dylan',
      password: "123",
    },
  ])
};
