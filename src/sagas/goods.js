/**
 * Created by AllenFeng on 2017/10/16.
 */
import {put, call, take, select} from 'redux-saga/effects';
import {goods as Action} from '../constants/actionType'
import request from '../common/js/request';
import * as GoodAction from '../actions/goods'

function* getGoods() {
    while (true) {
        try {
            yield take(Action.FETCH_GOODS);
            let data = yield call(request, '/api/goods', {method: 'get'});
            yield put(GoodAction.getGoods(data));
        } catch (e) {
            console.log(e);// eslint-disable-line
        }
    }
}

export {getGoods}
