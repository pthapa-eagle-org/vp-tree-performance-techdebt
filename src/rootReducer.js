import { combineReducers } from 'redux';
import progressBarReducer from './reducers/progressBarReducer';

const rootReducer = combineReducers({
    progressBar: progressBarReducer,
});
export default rootReducer;