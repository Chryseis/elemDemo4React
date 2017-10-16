/**
 * Created by AllenFeng on 2017/10/16.
 */
import {put, call, take, select} from 'redux-saga/effects';
import {seller as Action} from '../constants/actionType'
import request from '../common/js/request';
import * as SellerAction from '../actions/seller'


function* getSeller() {
    while (true) {
        yield take(Action.FETCH_SELLER);
        let data = yield call(request, '/api/seller', {method: 'get'});
        yield put(SellerAction.getSeller(data));
    }
}

export {getSeller}