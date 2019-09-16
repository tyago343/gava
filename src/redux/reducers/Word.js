import { GETWORD, GETDETAILS } from "../actions/types";

const initialState = {};
export default (state = initialState, action) => {
    switch (action.type){
        case GETWORD:
            return Object.assign({}, state, action.word)
        case GETDETAILS:
            return Object.assign({}, state, {details:action.details})
        default:
            return state;   
    }
}