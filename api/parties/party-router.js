const express = require("express");
const router = express.Router();
const Parties = require("./party-model");
const { restricted } = require("../users/user-middleware");

//This will get you all the parties for a user.
router.get("/parties", restricted, async (req, res, next) => {
  try {
    const allParties = await Parties.getAllPartiesByUser(
      req.decodedToken.user_id
    );
    res.json(allParties);
  } catch (err) {
    res.json(err);
  }
});

//This will add a new party for a user
router.post("/parties", restricted, async (req, res, next) => {
  try {
    const { user_id } = req.decodedToken;
    const newParty = await Parties.addParty(user_id, req.body);
    res.json(newParty);
  } catch (err) {
    res.json(err);
  }
});

//This will update a specific party
router.put("/parties/update/:party_id", restricted, async (req, res, next) => {
  try {
    const updatedParty = await Parties.updateParty(
      req.params.party_id,
      req.body
    );
    res.json(updatedParty);
  } catch (err) {
    next(err);
  }
});

//This will delete a party
router.delete("/parties/:party_id", restricted, async (req, res, next) => {
  try {
    const deleted = Parties.removeParty(req.params.party_id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

//This will get all the items for a specific party.
router.get("/items/:party_id", async (req, res, next) => {
  try {
    const allItemsForParty = await Parties.getAllItemsForParty(
      req.params.party_id
    );
    res.json(allItemsForParty);
  } catch (err) {
    next(err);
  }
});

//This will update a specific item for the party.
router.put("/items/update/:party_item_id", async (req, res, next) => {
  try {
    const updatedItem = await Parties.updateItem(
      req.params.party_item_id,
      req.body
    );
    res.json(updatedItem);
  } catch (err) {
    next(err);
  }
});

//This will add a new item to the party if user logged in. Only hosts can add items.
router.post("/items/:party_id", restricted, async (req, res, next) => {
  try {
    const newItem = await Parties.addItem(req.body, req.params.party_id);
    res.json(newItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
