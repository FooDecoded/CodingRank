import * as SolutionAPIUtil from './../util/solution_api_util';

export const RECEIVE_RUBY_SOLUTIONS = "RECEIVE_RUBY_SOLUTIONS";
export const RECEIVE_JS_SOLUTIONS = "RECEIVE_JS_SOLUTIONS";

export const receiveRubySolution = rubySolution => ({
    type: RECEIVE_RUBY_SOLUTIONS,
    rubySolution
})


export const receiveJSSolution = jsSolution => ({
    type: RECEIVE_JS_SOLUTIONS,
    jsSolution
})

// Thunk
export const fetchRubySolution = id => dispatch => (
    SolutionAPIUtil.getRubySolution(id)
    .then(rubySolution => dispatch(receiveRubySolution(rubySolution)))
    .catch(err => console.log(err.response))
)

// Thunk
export const fetchJSSolution = id => dispatch => (
    SolutionAPIUtil.getJSSolution(id)
        .then(jsSolution => dispatch(receiveJSSolution(jsSolution)))
        .catch(err => console.log(err.response))
)


// Thunk
export const createRubySolution = (rubySolution, problemId) => dispatch =>
    SolutionAPIUtil.writeRubySolution(rubySolution, problemId)
        .then((rubySolution) => { dispatch(receiveRubySolution(rubySolution))})

// Thunk
export const createJSSolution = (jsSolution, problemId) => dispatch =>
    SolutionAPIUtil.writeJSSolution(jsSolution, problemId)
        .then((jsSolution) => { dispatch(receiveJSSolution(jsSolution))})




export const skipRubyProblem = (problemId) => dispatch =>
    SolutionAPIUtil.skipToNextRubyProblem(problemId)
        .then((nextProblem) => { dispatch(receiveRubySolution(nextProblem)) })



export const skipJSProblem = ( problemId) => dispatch =>
    SolutionAPIUtil.skipToNextJSProblem( problemId)
        .then((nextProblem) => { dispatch(receiveJSSolution(nextProblem)) })