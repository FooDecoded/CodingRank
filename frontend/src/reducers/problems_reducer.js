import { RECEIVE_RUBY_PROBLEM, RECEIVE_JS_PROBLEM } from '../actions/problem_actions';

const problemsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    // debugger
    switch (action.type) {
        case RECEIVE_RUBY_PROBLEM:
            newState = action.rubyProblem.data;
            return newState;
        case RECEIVE_JS_PROBLEM:
            newState = action.jsProblem.data;
            return newState;
        default:
            return state;
    }
};

export default problemsReducer;