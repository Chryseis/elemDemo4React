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