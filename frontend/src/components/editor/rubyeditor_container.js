import { connect } from 'react-redux';
import RubyEditor from './rubyeditor';
import { fetchRubyProblem, fetchJSProblem } from '../../actions/problem_actions'
import { createRubySolution, skipRubyProblem } from '../../actions/solution_actions'

const mapStateToProps = (state) => {
  // debugger
  return {
    rubyProblem: state.entities.problems,
    jsProblem: state.entities.problems,
    rubySolutionResult: state.entities.solutions.ruby,
    
    // orderNumber: state.entities.user.
  }
};

const mapDispatchToProps = (dispatch) => {
  // debugger
  return{
    fetchRubyProblem: (id) => dispatch(fetchRubyProblem(id)),
    fetchJSProblem: (id) => dispatch(fetchJSProblem(id)),
    skipRubyProblem: (problemId) => dispatch(skipRubyProblem(problemId)),
    createRubySolution: (rubySolution, problemId) => dispatch(createRubySolution(rubySolution, problemId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RubyEditor);