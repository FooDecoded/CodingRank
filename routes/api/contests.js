const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const passport = require('passport');
const JSProblem = require('./../../models/JSProblem');
const RubyProblem = require('./../../models/RubyProblem');
const Contest = require('../../models/Contest')

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

router.get('/:contestId', passport.authenticate('jwt', { session: false }, (req, res) => {

    Contest.findById(req.params.contestId)
        .then(contest => {
            let { questions, endDate, startDate, language, results } = contest
            // check if it was done or not
            if (new Date().getTime() > contest.endDate.getTime()){
                // After the contest
                res.json({ questions, startDate, endDate, language, results })
            } else if (new Date().getTime() >= contest.startDate.getTime() && new Date().getTime() < contest.endDate.getTime()){
                // The contest time
                if (results[req.user._id]){
                    // if it the first time he joins
                    contest.results[req.user._id] = {
                        points: 0,
                        solutions: [],
                        duration: 60,
                        correctSolutions: 0
                    }
                    contest.save()
                    res.json({ questions, startDate, endDate, language})
                } else {
                    // if he already in
                    res.json({ questions, startDate, endDate, language, solutions: results[req.user._id] })
                }
            } else {
                // Before the contest
                res.json({ endDate, startDate, language })
            }
        })
        .catch(err => res.json({errors: "There is no contest with this Id"}))
}))


// Submit all Solutions , calcuate the points and add it to his profile, add the contest to his profile
router.post('/:contestId', passport.authenticate('jwt', { session: false }, (req, res) => {
    Contest.findById(req.params.contestId)
        .then(contest => {
            let userId = req.user._id
            if(contest.language === "JS"){
                let userSolutions = [];
                req.body.solutions.array.forEach(solution => {
                    let question = contest.problems.id(solution.problemId)
                    let fileName = `${Math.floor(Math.random() * 6) + 1}.js`;
                    fs.writeFile(fileName, jasmineReporter + solution.code + question.testCode, (err, file) => {
                        if (err) throw err;
                        exec(`jasmine ${fileName}`, (err, stdOut, stdErr) => {
                            if (JSON.parse(stdOut).failures.length === 0) {
                                userSolutions.push({
                                    code: solution.code,
                                    authorId: req.user._id,
                                    questionId: question.id,
                                    rightSolution: true
                                })
                                contest.results[req.user._id].points += 200
                                contest.results[req.user._id].correctSolutions += 1
                            } else {
                                userSolutions.push({
                                    code: solution.code,
                                    authorId: req.user._id,
                                    questionId: question.id,
                                })
                            }
                        })
                        fs.unlink(`./test/${fileName}`, () => { })
                    })
                }
                );
                contest.save((updatedContest) => res.json(updatedContest))
                
            } else if (contest.language === "Ruby"){
                let userSolutions = [];
                req.body.solutions.array.forEach(solution => {
                    let question = contest.problems.id(solution.problemId)
                    let fileName = `${Math.floor(Math.random() * 6) + 1}.js`;
                    fs.writeFile(fileName, solution.code + question.testCode, (err, file) => {
                        if (err) throw err;
                        exec(`rspec ${fileName} --require ./formatter.rb --format CustomFormatter`, (err, stdOut, stdErr) => {
                            if (JSON.parse(stdOut).failures.length === 0) {
                                userSolutions.push({
                                    code: solution.code,
                                    authorId: req.user._id,
                                    questionId: question.id,
                                    rightSolution: true
                                })
                                contest.results[req.user._id].points += 200
                                contest.results[req.user._id].correctSolutions += 1
                            } else {
                                userSolutions.push({
                                    code: solution.code,
                                    authorId: req.user._id,
                                    questionId: question.id,
                                })
                            }
                        })
                        fs.unlink(`./test/${fileName}`, () => { })
                    })
                }
                );
                contest.save((updatedContest) => res.json(updatedContest))
            }
        })
        .catch( errors => res.json(errors) )
})
)

router.post('/:contestId/testCode', passport.authenticate('jwt', { session: false }), (req, res) => {

Contest.findById(req.params.contestId)
    .then(contest => {
        let userId = req.user._id
        let question = contest.problems.id(req.body.solution.problemId)
        if (contest.language === "JS") {
            let fileName = `${Math.floor(Math.random() * 6) + 1}.js`;
            fs.writeFile(fileName, jasmineReporter + req.body.solution.code + question.testCode, (err, file) => {
                if (err) throw err;
                exec(`jasmine ${fileName}`, (err, stdOut, stdErr) => {
                    if (JSON.parse(stdOut).failures.length === 0) {
                        contest.results[req.user._id].solutions.push({
                            code: solution.code,
                            authorId: req.user._id,
                            questionId: question.id,
                            rightSolution: true
                        })
                    } else {
                        contest.results[req.user._id].solutions.push({
                            code: solution.code,
                            authorId: req.user._id,
                            questionId: question.id,
                            rightSolution: false
                        })   
                    }
                    contest.save()
                    fs.unlink(`./test/${fileName}`, () => {})
                    res.json(stdOut)
                    })})
            // fileName, req.body.code + problem.testCode
        } else if (contest.language === "Ruby"){
            let fileName = `${Math.floor(Math.random() * 6) + 1}.js`;
            fs.writeFile(fileName, req.body.solution.code + problem.testCode, (err, file) => {
                if (err) throw err;
                exec(`rspec ${fileName} --require ./formatter.rb --format CustomFormatter`, (err, stdOut, stdErr) => {
                    if (JSON.parse(stdOut).failures.length === 0) {
                        contest.results[req.user._id].solutions.push({
                            code: solution.code,
                            authorId: req.user._id,
                            questionId: question.id,
                            rightSolution: true
                        })
                    } else {
                        contest.results[req.user._id].solutions.push({
                            code: solution.code,
                            authorId: req.user._id,
                            questionId: question.id,
                            rightSolution: false
                        })
                    }
                    contest.save()
                    fs.unlink(`./test/${fileName}`, () => { })
                    res.json(stdOut)
                })
            })
        }
    }
    )
})

module.exports = router;