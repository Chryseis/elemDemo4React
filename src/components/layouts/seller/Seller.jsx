/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import './seller.less';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ShopCart from '../goods/ShopCart';
import * as GoodsActionCreator from '../../../actions/goods'
import Star from '../../common/star';
import bScroll from 'better-scroll';
import ReactBScroll from '../../common/scrollbar';

const options = {
    click: true
}

@connect(state => ({
    seller: state.seller,
    goods: state.goods,
    ratings: state.ratings
}), dispatch => ({
    goodActions: bindActionCreators(GoodsActionCreator, dispatch)
}))
class Seller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {info}=this.props.seller;
        const {goodsInfo, selectFoods}=this.props.goods;
        const {goodActions} = this.props;
        return <div className="seller">
            <ReactBScroll bScroll={bScroll} options={options} onRefresh={(iScrollInstance) => {
                let hasVerticalScroll = iScrollInstance.y;
                if (this.state.canVerticallyScroll != hasVerticalScroll) {
                    this.setState({canVerticallyScroll: hasVerticalScroll})
                }
            }}>
                <div>
                    <div className="seller-info">
                        <div className="name">{info.name}</div>
                        <div className="rating-wrapper border-1px"><Star size={36} score={info.score}
                                                                         style={{
                                                                             display: 'inline-block',
                                                                             verticalAlign: 'top'
                                                                         }}/><span
                            className="count">{`(${info.ratingCount})`}</span><span
                            className="count">{`月售${info.sellCount}单`}</span></div>
                        <div className="desc">
                            <div className="lab">
                                <div className="title">起送价</div>
                                <div className="text">{info.minPrice}<span className="unit">元</span></div>
                            </div>
                            <div className="lab">
                                <div className="title">商家配送</div>
                                <div className="text">{info.deliveryPrice}<span className="unit">元</span></div>
                            </div>
                            <div className="lab">
                                <div className="title">平均配送时间</div>
                                <div className="text">{info.deliveryTime}<span className="unit">分钟</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactBScroll>
            <ShopCart seller={info} selectFoods={selectFoods} addFood={goodActions.addFood}
                      removeFood={goodActions.removeFood} clearFoods={goodActions.clearFoods}/>
        </div>
    }
}

export default Seller

