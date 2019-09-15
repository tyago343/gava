import { FETCHLANGUAGES } from "../actions/types";

const initialState = [];
export default (state = initialState, action) => {
    switch (action.type){
        case FETCHLANGUAGES: 
            return Object.assign([], state, action.langs);
        default:
            return state;   
    }
}