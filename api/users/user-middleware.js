const Users = require("./user-model");

const allFilledOut = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: "username and password required" });
  } else {
    next();
  }
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const [user] = await Users.findBy({ username: req.body.username });
    if (!user) {
      next();
    } else {
      res.status(400).send({ message: "username taken" });
    }
  } catch (err) {
    next(err);
  }
};


const checkIfUsernameIsReal = async (req, res, next) => {
    try {
      const [user] = await Users.findBy({ username: req.body.username });
      if (!user) {
        res.status(404).json({ message: "invalid credentials" });
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      next(err);
    }
  };

module.exports = {
  allFilledOut,
  checkUsernameExists,
  checkIfUsernameIsReal
};
