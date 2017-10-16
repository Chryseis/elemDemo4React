/**
 * Created by AllenFeng on 2017/9/13.
 */
import goods from './goods';
import seller from './seller'
import ratings from './ratings'
import {combineReducers} from 'redux'

const reducer = combineReducers({
    goods,
    seller,
    ratings
});
export default reducer;