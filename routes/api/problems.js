const express = require("express");
const router = express.Router();
const RubyProblem = require('./../../models/RubyProblem');
const JSProblem = require('./../../models/JSProblem');
const User = require('../../models/User')
const passport = require('passport');

router.get('/Ruby', passport.authenticate('jwt', { session: false }), (req, res) => { 
console.log(req.user)    
User.findById(req.user.id)

        .then(user => {
            // console.log(user.languageProgress.Ruby.levelProgress, user.languageProgress.Ruby.level)
            if(user.currentLanguage !== "Ruby"){
                user.currentLanguage = "Ruby"
                user.markModified("currentLanguage");
                user.save();
            }
        
            RubyProblem.find({ orderNumber: user.languageProgress.Ruby.levelProgress, level: user.languageProgress.Ruby.level })
                .then(problem => res.json(problem))
                .catch(err =>
                    res.status(404).json({ noproblemsfound: 'There are no problems with that ID' }))        
        })  
})


router.get('/JS', passport.authenticate('jwt', { session: false }), (req, res) => { 
    console.log(req.user)    
    User.findById(req.user.id)
            .then(user => {
                if(user.currentLanguage !== "JS"){
                    user.currentLanguage = "JS"
                    user.markModified("currentLanguage");
                    user.save();
                }
            
                JSProblem.find({ orderNumber: user.languageProgress.JS.levelProgress, level: user.languageProgress.JS.level })
                    .then(problem => res.json(problem))
                    .catch(err =>
                        res.status(404).json({ noproblemsfound: 'There are no problems with that ID' }))        
            })  
    })
    




module.exports = router;
