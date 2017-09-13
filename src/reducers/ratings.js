/**
 * Created by AllenFeng on 2017/9/13.
 */
import {ratings as Action} from '../constants/actionType'

const initialState = {
    ratings: {}
}

const reducersMap = {}

export default function ratings(state = initialState, action) {
    const reduceFn = reducersMap[action.type];
    if (!reduceFn) {
        return state;
    }
    return Object.assign({}, state, reduceFn(state, action))
}