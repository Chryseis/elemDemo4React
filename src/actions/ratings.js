/**
 * Created by AllenFeng on 2017/9/13.
 */
import {ratings as  Action} from '../constants/actionType'

export function fetchRatings() {
    return {
        type: Action.FETCH_RATINGS
    }
}


export function getRatings(data) {
    return {
        type: Action.GET_RATINGS,
        data
    }
}