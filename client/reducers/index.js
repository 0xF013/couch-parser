import { combineReducers } from 'redux';
import releases from './releases';

const rootReducer = combineReducers({
  releases
});

export default rootReducer;