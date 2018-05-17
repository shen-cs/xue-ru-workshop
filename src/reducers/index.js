import { handleActions } from 'redux-actions';
import { initialState, reducerMap } from './bluetooth';



export default (state, action) => handleActions(reducerMap, initialState)(state, action);