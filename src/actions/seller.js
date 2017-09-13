/**
 * Created by AllenFeng on 2017/9/13.
 */
import {seller as  Action} from '../constants/actionType'
import fetch from '../common/js/fetch'
import {resCode} from '../constants/resCode'

export function getSeller() {
    return async(dispatch) => {
        let res = await fetch('/api/seller', {
            method: 'get'
        })
        let json = await res.json();
        if (json.errno === resCode.OK) {
            return dispatch({
                type: Action.GET_SELLER,
                data: json.data
            })
        }
    }
}