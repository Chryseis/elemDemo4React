/**
 * Created by AllenFeng on 2017/9/13.
 */
import {goods as Action} from '../constants/actionType'

const initialState = {
    goods: {}
}

const reducersMap = {}

export default function goods(state = initialState, action) {
    const reduceFn = reducersMap[action.type];
    if (!reduceFn) {
        return state;
    }
    return Object.assign({}, state, reduceFn(state, action))
}