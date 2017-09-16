/**
 * Created by AllenFeng on 2017/9/13.
 */
import {goods as  Action} from '../constants/actionType'
import fetch from '../common/js/fetch'
import {resCode} from '../constants/resCode'

export function getGoods() {
    return async (dispatch) => {
        let res = await fetch('/api/goods', {
            method: 'get'
        })
        let json = res.json();
        if (json.errno === resCode.OK) {
            return dispatch({
                type: Action.GET_GOODS,
                data: json.data
            })
        }
    }
}