/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import './goods.less';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as GoodsActionCreator from '../../../actions/goods';

@connect(state => ({
    seller: state.seller,
    goods: state.goods
}), dispatch => ({
    actions: bindActionCreators(GoodsActionCreator, dispatch)
}))
class Goods extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {actions} = this.props;
        actions.getGoods();
    }

    supportClassType = () => {
        return {
            0: 'decrease',
            1: 'discount',
            2: 'guarantee',
            3: 'invoice',
            4: 'special'
        }
    }

    render() {
        const {goodsInfo} = this.props.goods;
        return <div className="goods">
            <div className="menu-wrapper">
                <ul>
                    {
                        _.map(goodsInfo, (good, i) => {
                            return <li className="menu-item border-1px">
                                <span className="text">{good.type > -1 && <span
                                    className={`icon ${this.supportClassType()[good.type]}`}></span>}{good.name}</span>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="foods-wrapper"></div>
        </div>
    }
}

export default Goods

