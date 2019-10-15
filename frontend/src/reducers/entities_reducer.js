import { combineReducers } from 'redux';
import problemsReducer from './problems_reducer';
import solutionsReducer from './solutions_reducer';

const entitiesReducer = combineReducers({
   problems: problemsReducer,
   solutions: solutionsReducer
});

export default entitiesReducer;