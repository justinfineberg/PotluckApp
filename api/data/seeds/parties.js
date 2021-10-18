
exports.seed = async function (knex) {
  return knex('parties').del()
    .then(async function () {
  return await knex('parties').insert([
    {
      date: 'Dec 18',
      time: "12:30",
      location: "NYC",
      party_url_string: '1q3s4',
      user_id: 1,
    },
    {
      date: 'Oct 18',
      time: "12:50",
      location: "Chicago",
      party_url_string: '1q3v3',
      user_id: 1,
    },
    {
      date: 'Nov 18',
      time: "1:50",
      location: "Las Vegas",
      party_url_string: '2js8s',
      user_id: 6,
    },
    {
      date: 'January 18',
      time: "2:00",
      location: "France",
      party_url_string: '8sns7',
      user_id: 6,
    },
  ])
})
};