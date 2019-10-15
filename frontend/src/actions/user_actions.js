import * as SolutionAPIUtil from './../util/solution_api_util';

export const RECEIVE_SOLUTION = "RECEIVE_SOLUTION";

export const receiveSolution = solution => ({
  type: RECEIVE_SOLUTION,
  solution
})

export const fetchSolution = id => dispatch => (
  SolutionAPIUtil.getSolution(id)
    .then(solution => dispatch(receiveSolution(solution)))
)
