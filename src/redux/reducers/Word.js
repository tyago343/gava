import { GETWORD } from "../actions/types";

const initialState = {};
export default (state = initialState, action) => {
    switch (action.type){
        case GETWORD:
            return Object.assign({}, state, action.word)
        default:
            return state;   
    }
}