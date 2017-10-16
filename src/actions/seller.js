/**
 * Created by AllenFeng on 2017/9/13.
 */
import {seller as  Action} from '../constants/actionType'

export function fetchSeller() {
    return {
        type: Action.FETCH_SELLER
    }
}


export function getSeller(data) {
    return {
        type: Action.GET_SELLER,
        data
    }
}