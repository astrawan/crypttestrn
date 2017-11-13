import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';

const allReducers = combineReducers({
	session: sessionReducer
});

export default allReducers;