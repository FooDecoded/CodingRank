import * as ProblemAPIUtil from './../util/problem_api_util';


export const RECEIVE_RUBY_PROBLEM = "RECEIVE_RUBY_PROBLEM";
export const RECEIVE_JS_PROBLEM = "RECEIVE_JS_PROBLEM";

export const receiveRubyProblem = rubyProblem => ({
    type: RECEIVE_RUBY_PROBLEM,
    rubyProblem
})

export const receiveJSProblem = jsProblem => ({
    type: RECEIVE_JS_PROBLEM,
    jsProblem
})

export const fetchRubyProblem = id => dispatch => {
    // debugger
    return (
        ProblemAPIUtil.getRubyProblem(id)
            .then(rubyProblem => dispatch(receiveRubyProblem(rubyProblem)))
            .catch(err => console.log(err.response))
    )
};

export const fetchJSProblem = id => dispatch => (
    ProblemAPIUtil.getJSProblem(id)
        .then(jsProblem => dispatch(receiveJSProblem(jsProblem)))
        .catch(err => console.log(err.response))
);