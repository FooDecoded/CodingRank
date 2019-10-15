const express = require("express");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const JSProblem = require('./../../models/JSProblem');
const RubyProblem = require('./../../models/RubyProblem');
const User = require('../../models/User')
const exec = require('child_process').exec;
const fs = require("fs");

const jasmineReporter = `
var myReporter = {
    passes: [],
    failures: [],

    specDone: function(result) {
        if(result.status == "passed"){
            // console.log('Spec: ' + result.description + ' was ' + result.status);
            this.passes.push(result.description)
        } else {
            this.failures.push([result.description,result.failedExpectations[0].message])
        }
    },
  jasmineDone: function() {
      console.log(JSON.stringify({ passes: this.passes, failures: this.failures }))
    }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(myReporter);

`

router.post('/addComment',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        userId = req.user.id
        if (req.body.language == "JS") {
            JSProblem.findById(req.body.problemId)
                .then((problem) => {
                    // problem.solutions.pull(req.body.solutionId).comments.push({ body: req.body.body, author: userId }).save(function (neww) { res.json(neww) })
                    // problem.solutions.pull(req.body.solutionId).push({s})
                    // var id = mongoose.Types.ObjectId();
                    console.log(problem)
                    problem.solutions[req.body.solutionId].comments.push({ body: req.body.comment, author: userId })
                    problem.markModified(`solutions.${req.body.solutionId}.comments`)                    
                    problem.save((errors, updatedProblem) => res.json(updatedProblem) )
                })
                .catch(err => res.status(404).json(err))
        }
        else if (req.body.language == "Ruby") {
            RubyProblem.findById(req.body.problemId)
                .then((problem) => {
                    // DOesn't seem pretty effeicent
                    // problem.solutions.pull(req.body.solutionId).comments.push({ body: req.body.body, author: userId })
                    problem.solutions[req.body.solutionId].comments.push({ body: req.body.comment, author: userId })
                    problem.markModified(`solutions.${req.body.solutionId}.comments`)                    
                    problem.save((errors , updatedProblem) => res.json(updatedProblem))
                })
                .catch(err => res.status(404).json(err))
        }
    }
)

router.post('/upvote',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // console.log(`solutions.${req.body.solutionId}.upvotes`)
        userId = req.user.id
        console.log(req.body.language)
        if (req.body.language == "JS") {
            JSProblem.findById(req.body.problemId)
                .then((problem) => {
                    problem.solutions[req.body.solutionId].upvotes.push(userId)
                    problem.markModified(`solutions.${req.body.solutionId}.upvotes`)                    
                    problem.save((updatedProblem) => res.json({}))
                })
                .catch(err => res.status(404).json(err))
        }
        else if (req.body.language == "Ruby") {
            RubyProblem.findById(req.body.problemId)
                .then((problem) => {
                    problem.solutions[req.body.solutionId].upvotes.push(userId)
                    problem.markModified(`solutions.${req.body.solutionId}.upvotes`)                    
                    problem.save((updatedProblem) => res.json(updatedProblem.solutions))
                })
                .catch(err => res.status(404).json(err))
        }
    }
)

// fetch a specific solution
router.get('/:language/:problemId', 
passport.authenticate('jwt', { session: false }),
(req, res) => {
    if (req.params.language == "JS"){
        JSProblem.findById(req.params.problemId)
        .then(problem => res.json(problem.solutions))
        .catch(err => res.status(404).json({ solution: 'There is no solution for this problem '}))
    } else if (req.params.language == "Ruby"){
        RubyProblem.findById(req.params.problemId)
        .then(problem => res.json(problem.solutions))
        .catch(err => res.status(404).json({ solution: 'There is no solution for this problem ' }))
    }
})



router.post('/:language/:problemId', passport.authenticate('jwt', { session: false }),
(req, res) => {
    User.findById(req.user.id)
    .then(user => {
            //  console.log("before the if", req.params.language == "JS" && !req.body.skip)
            
                if (req.params.language == "JS" && !req.body.skip){
                    // console.log("hitting JS")
                    JSProblem.findById(req.params.problemId)
                        .then(problem => {
                            let fileName = `${Math.floor(Math.random() * 99999) + 1}.js`;
                            fs.writeFile(`./tests/${fileName}`, req.body.code  + jasmineReporter + problem.testCode, function (err, file) {
                                // throw new Error('BROKEN')
                                // if (err) next err;
                                // console.log("asasasasas", file)
                                // console.log(`jasmine ./tests/${fileName}`)
                                exec(`jasmine ./tests/${fileName}`, (err, stdOut, stdErr) => {
                                    // let jsonResult 
                                    let syntaxError = false
                                    try{
                                        JSON.parse(stdOut)
                                    } catch(err) {
                                        syntaxError = true
                                        res.json({runresults: ["You have a Run-Time error", "Please check your code"]})
                                    }
                                    if ( !syntaxError && JSON.parse(stdOut).failures.length === 0) {
                                        let update = {}
                                        if(user.languageProgress.JS.levelProgress >= 20){
                                            update = {
                                                $inc: { 'languageProgress.JS.level': 1 },
                                                $set: {'languageProgress.JS.levelProgress': 1}
                                            }
                                        } else {
                                            update = {
                                                $inc: { 'languageProgress.JS.levelProgress': 1 }
                                            }
                                        }
                                        User.findByIdAndUpdate(req.user.id, update).then( user => console.log(user) )
                                        // console.log(problem.solutions)
                                        var id = mongoose.Types.ObjectId();
                                        problem.solutions[id] = {
                                            author: user._id,
                                            code: req.body.code,
                                            comments: [],
                                            upvotes: []
                                        }
                                        problem.markModified("solutions");
                                        problem.save();
                                    }
                                    !syntaxError && res.json({ result: JSON.parse(stdOut) });
                                    fs.unlink(`./tests/${fileName}`, () => { })
                                })
                            })

                        })                        
                        .catch(err => console.log(err))
                    } else if (req.params.language == "Ruby" && !req.body.skip) {
                        debugger
                       console.log("I touched this!!!!!!")
                        RubyProblem.findById(req.params.problemId)
                            .then(problem => {
                                let fileName = `${Math.floor(Math.random() * 99999) + 1}.rb`;
                                
                                fs.writeFile(`./tests/${fileName}`, 'begin\n'+ req.body.code + "\nrescue Exception  => e\n puts e\n print 'You have a Run-time Error' \nend" + problem.testCode, function (err, file) {
                                        exec(`begin\n rspec ./tests/${fileName} --require ./tests/formatter.rb --format CustomFormatter \nrescue Exception => e\n puts e\n print 'You have a Run-time Error' \nend`, (err, stdOut, stdErr) => {
                                            let syntaxError = false
                                            try{
                                                JSON.parse(stdOut)
                                            } catch(err) {
                                                syntaxError = true
                                                res.json({runresults: ["You have a Run-Time error", "Please check your code"]})
                                            }
                                            if (!syntaxError && JSON.parse(stdOut).failures.length === 0) {
                                                console.log("in iffffffffffffffffffffffffff")
                                                let update = {}
                                                if(user.languageProgress.Ruby.levelProgress >= 20){
                                                    update = {
                                                        $inc: { 'languageProgress.Ruby.level': 1 },
                                                        $set: {'languageProgress.Ruby.levelProgress': 1}
                                                    }
                                                } else {
                                                    update = {
                                                        $inc: { 'languageProgress.Ruby.levelProgress': 1 }
                                                    }
                                                }
                                                User.findByIdAndUpdate(req.user.id, update).then( user => console.log(user) )
                                                console.log(problem.solutions)
                                                var id = mongoose.Types.ObjectId();
                                                problem.solutions[id] = {
                                                    author: user._id,
                                                    code: req.body.code,
                                                    comments: [],
                                                    upvotes: []
                                                }
                                                problem.markModified("solutions")
                                                problem.save()
                                            }
                                            !syntaxError && res.json({ result: JSON.parse(stdOut) });
                                            fs.unlink(`./tests/${fileName}`, () => { }) 
                                            // }
                                        })
                                    
                                   
                                })

                            })
                            .catch(err => console.log(err))
                } else if(req.body.skip){
                    if (req.params.language == "Ruby") {
                        let update = {}
                        if(user.languageProgress.Ruby.levelProgress >= 20){
                            update = {
                                $inc: { 'languageProgress.Ruby.level': 1 },
                                $set: {'languageProgress.Ruby.levelProgress': 1}
                            }
                        } else {
                            update = {
                                $inc: { 'languageProgress.Ruby.levelProgress': 1 }
                            }
                        }
                        User.findByIdAndUpdate(req.user.id, update).then(( updatedUser) => {
                            RubyProblem.find({ orderNumber: updatedUser.languageProgress.Ruby.levelProgress, level: updatedUser.languageProgress.Ruby.level })
                            .then(problem => res.json(problem))
                        })
                    } else if(req.params.language == "JS"){
                        let update = {}
                        if(user.languageProgress.JS.levelProgress >= 20){
                            update = {
                                $inc: { 'languageProgress.JS.level': 1 },
                                $set: {'languageProgress.JS.levelProgress': 1}
                            }
                        } else {
                            update = {
                                $inc: { 'languageProgress.JS.levelProgress': 1 }
                            }
                        }
                        User.findByIdAndUpdate(req.user.id, update).then(( updatedUser) => {
                            JSProblem.find({ orderNumber: updatedUser.languageProgress.JS.levelProgress, level: updatedUser.languageProgress.JS.level })
                            .then(problem => res.json(problem))
                        })
                    }
                }
        })
        .catch(err => res.json(err))
    }
);

module.exports = router;