/**
 * Created by AllenFeng on 2017/9/13.
 */
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'


export default function configureStore(initialState) {
    return createStore(reducer, initialState, applyMiddleware(thunk))
}