const db = require('../data/db-config')

async function getAllPartiesByUser(user_id){
   const allParties = await db("parties").where('user_id', user_id)
   return allParties
}


module.exports = {
    getAllPartiesByUser
}