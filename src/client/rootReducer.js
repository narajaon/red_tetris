import { combineReducers } from 'redux';
import gridReducer from './reducers/Grid';
import gameReducer from './reducers/Game';

/**
 * TODO :
 * - Create full tile state
 * - Handle collisions
 * - Place Piece
 * - Generate new piece
 */
export default combineReducers({
	gridReducer,
	gameReducer,
});