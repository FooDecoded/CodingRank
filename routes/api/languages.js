const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const passport = require('passport');



// When They select The 2nd language (RUBY) in their profile after login
router.post('/:languageId', passport.authenticate('jwt', {session: false}, (req, res) => {
    // let userId = req.user.id;
    console.log(req.user.id, "aaaaaaaaaaaaaaaaa")
    User.findById(req.user.id).then(
        (user) => {
            user.enrolledLanguages.push(req.params.languageId)
            user.currentLanguage = req.params.languageId
            user.languageProgress
            user.languageProgress[req.params.languageId] = {
                level: 1, 
                levelProgress: 1
            }
            user.markModified('enrolledLanguages')
            user.markModified('currentLaguage')
            user.markModified('languageProgress')            
            user.save().then(() => res.json("Ruby selected successfully") )

        }
        )
}))






module.exports = router;