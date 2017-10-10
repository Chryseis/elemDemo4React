/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import './seller.less';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ShopCart from '../goods/ShopCart';
import * as GoodsActionCreator from '../../../actions/goods';
import * as SellerActionCreator from '../../../actions/seller';
import Star from '../../common/star';
import bScroll from 'better-scroll';
import ReactBScroll from '../../common/scrollbar';

const options = {
    click: true
}

const options2 = {
    scrollX: true
}

@connect(state => ({
    seller: state.seller,
    goods: state.goods,
    ratings: state.ratings
}), dispatch => ({
    actions: bindActionCreators(SellerActionCreator, dispatch),
    goodActions: bindActionCreators(GoodsActionCreator, dispatch)
}))
class Seller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        }
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

    componentDidMount() {
        const {info}=this.props.seller;
        const {actions}=this.props;
        if (!info.pics) {
            actions.getSeller();
        } else {
            this.setState({
                width: info.pics.length * 126 - 6
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.seller.info && nextProps.seller.info.pics) {
            this.setState({
                width: nextProps.seller.info.pics.length * 126 - 6
            })
        }
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
                    <div className="seller-summary">
                        <h1 className="title">公告与活动</h1>
                        <p className="bulletin border-1px">{info.bulletin}</p>
                        <ul>
                            {
                                _.map(info.supports, (support, i) => (
                                    <li className="support" key={i}>
                                        <span
                                            className={`icon ${this.supportClassType()[support.type]}`}/><span
                                        className="text">{support.description}</span>
                                    </li>))
                            }
                        </ul>
                    </div>
                    <div className="seller-view">
                        <h1 className="title">商家实景</h1>
                        <ReactBScroll bScroll={bScroll} options={options2} onRefresh={(iScrollInstance) => {
                            let hasHorizontalScroll = iScrollInstance.x;
                            if (this.state.canHorizontalScroll != hasHorizontalScroll) {
                                this.setState({canHorizontalScroll: hasHorizontalScroll})
                            }
                        }}>
                            <div style={{width: this.state.width}}>
                                <ul className="pic-wrapper clearfix">
                                    {
                                        _.map(info.pics, (pic, i) => (
                                            <li className="pic" key={i}><img src={pic} width={120} height={90} alt=""/>
                                            </li>))
                                    }
                                </ul>
                            </div>
                        </ReactBScroll>
                    </div>
                    <div className="seller-detail">
                        <h1 className="title">商家信息</h1>
                        {
                            _.map(info.infos, (item, i) => (<div className="info" key={i}>{item}</div>))
                        }
                    </div>
                </div>
            </ReactBScroll>
            <ShopCart seller={info} selectFoods={selectFoods} addFood={goodActions.addFood}
                      removeFood={goodActions.removeFood} clearFoods={goodActions.clearFoods}/>
        </div>
    }
}

export default Seller

