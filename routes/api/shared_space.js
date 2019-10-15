const express = require("express");
const router = express.Router();
const SharedSpace = require('./../../models/SharedSpace');
const User = require('../../models/User')
const passport = require('passport');

router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => { 
    const newSharedSpace = new SharedSpace({owner: req.user.id})
    newSharedSpace.onlineUsers.push(req.user.id);
    newSharedSpace.save()
    .then(sharedSpace => {
        res.json(sharedSpace)
    })  
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { 
    // console.log('request iddddddddddddddd', req.params.id)
    SharedSpace.findById(req.params.id)
    .then(sharedSpace => {
        if(sharedSpace.onlineUsers.indexOf(req.user.id) === -1){
            sharedSpace.onlineUsers.push(req.user.id);
            sharedSpace.markModified(`onlineUsers`);
            sharedSpace.save((errors, updatedSharedSpace) => res.json(updatedSharedSpace) )
        }
        res.json(sharedSpace)
    })
})
module.exports = router;
