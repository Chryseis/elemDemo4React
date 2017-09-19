/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import './goods.less';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as GoodsActionCreator from '../../../actions/goods';
import MenuItem from './MenuItem';
import FoodItem from './FoodItem';

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

    render() {
        const {goodsInfo} = this.props.goods;
        return <div className="goods">
            <div className="menu-wrapper">
                <ul>
                    {
                        _.map(goodsInfo, (good, i) => {
                            return <MenuItem menu={good} key={i}/>
                        })
                    }
                </ul>
            </div>
            <div className="foods-wrapper">
                {
                    _.map(goodsInfo, (good, i) => {
                        return <FoodItem good={good} key={i}/>
                    })
                }
            </div>
        </div>
    }
}

export default Goods

