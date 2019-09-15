import { combineReducers } from 'redux';
import langs from './Languages.js';
import word from './Word.js';

export default combineReducers({
    langs,
    word
})