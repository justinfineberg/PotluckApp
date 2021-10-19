const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { buildToken } = require('./token-builder')

const Users = require("./user-model");
const {
  allFilledOut,
  checkUsernameExists,
  checkIfUsernameIsReal,
} = require("./user-middleware");

router.post( "/register", allFilledOut, checkUsernameExists, async (req, res, next) => {
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

router.post("/login", allFilledOut, checkIfUsernameIsReal, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = buildToken(req.user);
    res.json({
      message: `welcome, ${req.user.username}`,
      token: token,
    });
  } else {
    res.status(401).json({ message: "invalid credentials" });
  }
});

router.get("/allpartylinks", async (req, res, next)=>{
  try{
    const allURLS = await Users.getAllPartyURLS()
    res.json(allURLS)
  }catch(err) {
    console.log(err)
  }
})

module.exports = router;
