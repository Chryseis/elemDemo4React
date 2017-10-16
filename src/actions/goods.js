/**
 * Created by AllenFeng on 2017/9/13.
 */
import {goods as  Action} from '../constants/actionType'

export function fetchGoods() {
    return {
        type: Action.FETCH_GOODS
    }
}

export function getGoods(data) {
    return {
        type: Action.GET_GOODS,
        data
    }
}

/**** change redux-saga
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
}*/

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