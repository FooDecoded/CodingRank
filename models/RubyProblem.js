const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SolutionSchema = require('./Solution')

const RubyProblemSchema = new Schema({

    solutions: { type: Object, default: {}, required: true },
    orderNumber: {
        type: Number,
        required: true // Gotta be unique
    },

    level: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    testCode: {
        type: String,
        required: true
    },

    initialCode: {
        type: String
    },

    hints: {
        type: String
    },

    inputOutput: [{
        type: String
    }],

    originalSolution: {
        type: String,
        required: true
    },

    upvotes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    tags: [{ type: String }]
}, { minimize: false })

RubyProblemSchema.index({
level: 1,
orderNumber: 1,
}, {
unique: true,
});
      

module.exports = RubyProblem = mongoose.model('rubyproblems', RubyProblemSchema);