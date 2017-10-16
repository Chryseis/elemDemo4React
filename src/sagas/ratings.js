/**
 * Created by AllenFeng on 2017/10/16.
 */
import {put, call, take, select} from 'redux-saga/effects';
import {ratings as Action} from '../constants/actionType'
import request from '../common/js/request';
import * as RatingAction from '../actions/ratings'


function* getRatings() {
    while (true) {
        yield take(Action.FETCH_RATINGS);
        let data = yield call(request, '/api/ratings', {method: 'get'});
        yield put(RatingAction.getRatings(data));
    }
}

export {getRatings}