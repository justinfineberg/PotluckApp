exports.seed = async function (knex) {
  return await knex('items').insert([
    {
      item_name: 'Tequila',
    },
    {
      item_name: 'Chips',
    },
    {
      item_name: 'Coke',
    },
    {
      item_name: 'Chicken',
    },
    {
      item_name: 'Sprite',
    },
    {
      item_name: 'Limes',
    },
    {
      item_name: 'Apples',
    },
  ])
};