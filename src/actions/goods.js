/**
 * Created by AllenFeng on 2017/9/13.
 */
import {goods as  Action} from '../constants/actionType'
import fetch from '../common/js/fetch'
import {resCode} from '../constants/resCode'

export function getGoods() {
    return async(dispatch) => {
        let res = await fetch('/api/goods', {
            method: 'get'
        })
        let json = await res.json();
        if (json.errno === resCode.OK) {
            return dispatch({
                type: Action.GET_GOODS,
                data: json.data
            })
        }
    }
}

export function addFood(selectFood) {
    return {
        type: Action.ADD_FOOD,
        selectFood
    }
}

export function removeFood(removeFood) {
    return {
        type: Action.REMOVE_FOOD,
        removeFood
    }
}

export function clearFoods() {
    return {
        type: Action.CLEAR_FOODS
    }

}