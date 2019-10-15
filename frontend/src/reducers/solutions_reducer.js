import { RECEIVE_RUBY_SOLUTIONS, RECEIVE_JS_SOLUTIONS } from '../actions/solution_actions';

const solutionsReducer = (state = {ruby: {}, js: {}}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    // debugger
    switch (action.type) {
        case RECEIVE_RUBY_SOLUTIONS:
            newState.ruby = action.rubySolution.data;
            return newState;
        case RECEIVE_JS_SOLUTIONS:
            // debugger
            newState.js = action.jsSolution.data;
            return newState;
        default:
            return state;
    }
};

export default solutionsReducer;