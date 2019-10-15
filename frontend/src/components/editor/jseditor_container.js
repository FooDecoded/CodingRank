import { connect } from 'react-redux';
import JSEditor from './jseditor'
import { fetchRubyProblem, fetchJSProblem } from '../../actions/problem_actions'
import { createJSSolution, skipJSProblem } from '../../actions/solution_actions'

const mapStateToProps = (state) => {
  // debugger
  return {
    JSProblem: state.entities.problems,
    JSSolutionResult: state.entities.solutions.js
    
    // orderNumber: state.entities.user.
  }
};

const mapDispatchToProps = (dispatch) => {
  // debugger
  return{
    fetchJSProblem: (id) => dispatch(fetchJSProblem(id)),
    skipJSProblem: (problemId) => dispatch(skipJSProblem(problemId)),
    createJSSolution: (rubySolution, problemId) => dispatch(createJSSolution(rubySolution, problemId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JSEditor);