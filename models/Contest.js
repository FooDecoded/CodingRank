const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContestProblemSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    testCode: {
        type: String,
        required: true
    },
    inputOutput: [{
        type: String,
        required: true
    }],
})
// const ContestSolutionSchema = new Schema({
//     code: {
//         type: String,
//         required: true
//     },
//     authorId: {
//         type: Schema.Types.ObjectId,
//         ref: 'users',
//         required: true
//     },
//     questionId: {
//         type: String,
//         required: true
//     },
//     rightSolution: {
//         type: Boolean,
//         default: false
//     }
// })

const ContestSchema = new Schema({
    tags: [{ type: String }],
    // Array of categories the problems in the contest belong to (sum of categories of each problem in the contest? I am still not sure if it is needed )
    questions: [ContestProblemSchema],
    endDate: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },

    language: {
        type: String,
        required: true
    },
    results: {  // userId : { code: "function blah blah", problemID }
        type: Object,
        required: true
    }
})

module.exports = Contest = mongoose.model('contests', ContestSchema);