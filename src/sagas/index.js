/**
 * Created by AllenFeng on 2017/10/16.
 */
import {getGoods} from './goods'
import {getRatings} from './ratings'
import {getSeller} from './seller'
import {all} from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([getGoods(), getRatings(), getSeller()])
}