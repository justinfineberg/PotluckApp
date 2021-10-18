const express = require("express");
const router = express.Router();
const Parties = require('./party-model')
const { restricted } = require("../users/user-middleware")

router.get("/parties", restricted, async(req, res, next)=>{
    try {
        const allParties = await Parties.getAllPartiesByUser(req.decodedToken.user_id)
        res.json(allParties)
    }catch (err){
        next(err)
    }
})

router.post("/parties", restricted, async(req, res, next)=>{
    try {
        const { user_id } = req.decodedToken
        const newParty = await Parties.addParty(user_id, req.body)
        res.json(newParty)
    } catch (err){
        next(err)
    }
})

router.delete('/parties/:party_id', restricted, async(req, res, next)=>{
    try {
        const deleted = Parties.removeParty(req.params.party_id)
        res.json(deleted)
    } catch (err){
        next(err)
    }
})

router.get("/items/:party_id", restricted, async(req,res,next)=>{
    try{
        const allItemsForParty = await Parties.getAllItemsForParty(req.params.party_id)
        res.json(allItemsForParty)
    } catch (err){
        next(err)
    }
})

router.post("/items/:party_id", restricted, async(req, res, next)=>{
    try {
        const newItem = await Parties.addItem(req.body, req.params.party_id)
        res.json(newItem)
    }catch (err){
        next(err)
    }
})

module.exports = router