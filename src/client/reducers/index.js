import { combineReducers } from 'redux';
import gridReducer from './Grid';

/**
 * TODO :
 * - Create full tile state
 * - Handle collisions
 * - Place Piece
 * - Generate new piece
 */
export default combineReducers({
	gridReducer
});