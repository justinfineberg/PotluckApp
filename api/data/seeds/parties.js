
exports.seed = async function (knex) {
  return knex('parties').del()
    .then(async function () {
  return await knex('parties').insert([
    {
      date: 'Dec 18',
      time: "12:30",
      location: "NYC",
      user_id: 1,
    },
    {
      date: 'Oct 18',
      time: "12:50",
      location: "Chicago",
      user_id: 1,
    },
    {
      date: 'Nov 18',
      time: "1:50",
      location: "Las Vegas",
      user_id: 2,
    },
    {
      date: 'January 18',
      time: "2:00",
      location: "France",
      user_id: 3,
    },
  ])
})
};