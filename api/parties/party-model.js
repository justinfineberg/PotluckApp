const db = require("../data/db-config");
const { generateRandomString } = require("./party-middleware");

async function getAllPartiesByUser(user_id) {
  const allParties = await db("parties").where("user_id", user_id);
  return allParties;
}

async function getAllItemsForParty(party_id) {
  const items = await db("parties_items").where("party_id", party_id);
  return items;
}

async function addItem(item, party_id) {
  const [newItemObject] = await db("parties_items").insert(
    {
      completed: item.completed,
      person_bringing: item.person_bringing,
      party_id: party_id,
      item_name: item.item_name,
    },
    ["completed", "person_bringing", "party_id", "item_name", "party_item_id"]
  );
  return newItemObject;
}

async function addParty(user_id, party) {
  const [newPartyObject] = await db("parties").insert(
    {
      date: party.date,
      time: party.time,
      location: party.location,
      party_url_string: generateRandomString(5),
      user_id: user_id,
    },
    ["party_id", "date", "time", "location", "party_url_string", "user_id"]
  );
  return newPartyObject;
}

async function removeParty(party_id) {
  const deleted = db("parties").where("party_id", party_id).del();
  return deleted;
}

async function updateItem(party_item_id, changes) {
  const updated = db("parties_items")
    .update(changes, [
      "party_item_id",
      "completed",
      "person_bringing",
      "item_name",
      "party_id",
    ])
    .where("party_item_id", party_item_id);
  return updated;
}

async function updateParty(party_id, changes) {
  const updated = db("parties")
    .update(changes, [
      "party_id",
      "date",
      "time",
      "location",
      "party_url_string",
      "user_id",
    ])
    .where("party_id", party_id);
  return updated;
}

module.exports = {
  getAllPartiesByUser,
  getAllItemsForParty,
  addItem,
  addParty,
  removeParty,
  updateItem,
  updateParty,
};
