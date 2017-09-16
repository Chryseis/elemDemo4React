/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import './goods.less';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as GoodsActionCreator from '../../../actions/goods';

connect(state=>({
    goods:state.goods
}),dispatch=>({
    action:bindActionCreators(GoodsActionCreator)
}))
class Goods extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="goods">
            <div className="menu-wrapper"></div>
            <div className="foods-wrapper"></div>
        </div>
    }
}

export default Goods

