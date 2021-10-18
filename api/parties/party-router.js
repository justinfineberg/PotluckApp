const express = require("express");
const router = express.Router();
const Parties = require('./party-model')
const { restricted } = require("../users/user-middleware")

router.get("/parties", restricted, async(req, res, next)=>{
    try {
        console.log(req.decodedToken)
        const allParties = await Parties.getAllPartiesByUser(req.decodedToken.user_id)
        res.json(allParties)
    }catch (err){
        next(err)
    }
})

module.exports = router