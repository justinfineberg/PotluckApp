const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Users = require("./user-model");
const { allFilledOut, checkUsernameExists } = require("./user-middleware");

router.post(
  "/register",
  allFilledOut,
  checkUsernameExists,
  async (req, res, next) => {
    let user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8; // 2 ^ 8
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;
    try {
      const newUserObject = await Users.insertUser(user);
      res.status(201).json(newUserObject);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
