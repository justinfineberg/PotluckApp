const Users = require("./user-model");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./secrets/index")

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

  const restricted = (req, res, next)=>{
      const token = req.headers.authorization;
      if (!token){
          return res.status(400).json({message: "Access Denied"})
      }

      jwt.verify(token, JWT_SECRET, (err, decodedToken)=>{
          if (err){
              res.status(401).json({message: "token invalid"})
          } else {
              req.decodedToken = decodedToken;
              next();
          }
      })
  }

module.exports = {
  allFilledOut,
  checkUsernameExists,
  checkIfUsernameIsReal,
  restricted
};
