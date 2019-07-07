import * as types from '../constants/ActionTypes';

export const getItem = (item)=>{
    return{
        type: types.DETAIL,
        item
    }
}