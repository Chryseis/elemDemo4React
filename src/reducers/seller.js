/**
 * Created by AllenFeng on 2017/9/13.
 */
import {seller as Action} from '../constants/actionType'

const initialState = {
    seller: {}
}

const reducersMap = {
    [Action.GET_SELLER]: (state, action) => {
        return {
            seller: action.data
        }
    }
}

export default function seller(state = initialState, action) {
    const reduceFn = reducersMap[action.type];
    if (!reduceFn) {
        return state;
    }
    return Object.assign({}, state, reduceFn(state, action))
}