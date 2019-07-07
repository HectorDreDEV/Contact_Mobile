import * as types from '../constants/ActionTypes';


let initialState = {
    item: {},
    detailItem: {}
};

var myReducer = (state = initialState, action) =>{
    switch(action.type){

        case types.DETAIL:
            state = action.item;
            return state;

        default: return state;   
    }
}

export default myReducer;