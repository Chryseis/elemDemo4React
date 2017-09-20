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
import BScroll from 'better-scroll'

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

    componentDidUpdate() {
        this.menuScroll = new BScroll(this.menuWrapper, {});
        this.foodScroll = new BScroll(this.foodWrapper, {});
    }

    render() {
        const {goodsInfo} = this.props.goods;
        return <div className="goods">
            <div className="menu-wrapper" ref={menuWrapper => this.menuWrapper = menuWrapper}>
                <ul>
                    {
                        _.map(goodsInfo, (good, i) => {
                            return <MenuItem menu={good} key={i}/>
                        })
                    }
                </ul>
            </div>
            <div className="foods-wrapper" ref={foodWrapper => this.foodWrapper = foodWrapper}>
                {
                    <ul>
                        {
                            _.map(goodsInfo, (good, i) => {
                                return <FoodItem good={good} key={i}/>
                            })
                        }
                    </ul>
                }
            </div>
        </div>
    }
}

export default Goods

