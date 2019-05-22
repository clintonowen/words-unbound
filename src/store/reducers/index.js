import { combineReducers } from 'redux';
import wordsReducer from './words';

const combinedReducers = combineReducers({
  words: wordsReducer
});

export default combinedReducers;
