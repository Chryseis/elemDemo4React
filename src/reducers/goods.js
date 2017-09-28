/**
 * Created by AllenFeng on 2017/9/13.
 */
import {goods as Action} from '../constants/actionType'

const initialState = {
    goodsInfo: [],
    selectFoods: []
}

const reducersMap = {
    [Action.GET_GOODS]: (state, action) => {
        return {
            goodsInfo: action.data
        }
    },
    [Action.ADD_FOOD]: (state, action) => {
        let selectFoods = _.cloneDeep(state.selectFoods);
        selectFoods.push(action.selectFood);
        return {
            selectFoods
        }
    },
    [Action.REMOVE_FOOD]: (state, action) => {
        let selectFoods = _.cloneDeep(state.selectFoods);
        let index = _.findIndex(selectFoods, (food) => {
            return food.name == action.removeFood.name
        })
        selectFoods.splice(index, 1);
        return {
            selectFoods
        }
    },
    [Action.CLEAR_FOODS]:(state,action)=>{
        return {
            selectFoods:[]
        }
    }
}

export default function goods(state = initialState, action) {
    const reduceFn = reducersMap[action.type];
    if (!reduceFn) {
        return state;
    }
    return Object.assign({}, state, reduceFn(state, action))
}