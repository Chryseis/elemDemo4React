/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './ratings.less';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as RatingsActionCreator from '../../../actions/ratings';
import * as GoodsActionCreator from '../../../actions/goods';
import ShopCart from '../goods/ShopCart'
import Star from '../../common/star';
import RatingSelect from '../../common/ratingSelect';
import RatingBody2 from '../../common/ratingBody2';
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
    actions: bindActionCreators(RatingsActionCreator, dispatch),
    goodActions: bindActionCreators(GoodsActionCreator, dispatch)
}))
class Ratings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: false
        }
    }

    componentDidMount() {
        const {actions}=this.props;
        actions.fetchRatings();
    }

    changeHeight = () => {
        let ratingHeight = ReactDOM.findDOMNode(this.rating).scrollHeight;
        if (this.ratingHeight !== ratingHeight) {
            this.setState(preState => {
                return {
                    height: preState.height
                }
            }, () => this.ratingHeight = ratingHeight)
        }
    }

    render() {
        const {info}=this.props.seller;
        const {goodsInfo, selectFoods}=this.props.goods;
        const {ratings}=this.props.ratings;
        const {goodActions} = this.props;
        return <div className="ratings">
            <ReactBScroll bScroll={bScroll} options={options} onRefresh={(iScrollInstance) => {
                let hasVerticalScroll = iScrollInstance.y;
                if (this.state.canVerticallyScroll != hasVerticalScroll) {
                    this.setState({canVerticallyScroll: hasVerticalScroll})
                }
            }}>
                <div className="content-wrapper">
                    <div className="seller-info clearfix">
                        <div className="left">
                            <div className="score">{info.score}</div>
                            <div className="total">综合评分</div>
                            <div className="rankRate">{`高于周边商家${info.rankRate}%`}</div>
                        </div>
                        <div className="right">
                            <div className="desc"><span className="name">服务态度</span><Star score={info.serviceScore}
                                                                                          size={36} style={{
                                display: 'inline-block',
                                verticalAlign: 'top',
                                marginRight: '12px'
                            }}/><span className="score">{info.serviceScore}</span></div>
                            <div className="desc"><span className="name">美味指数</span><Star score={info.foodScore}
                                                                                          size={36}
                                                                                          style={{
                                                                                              display: 'inline-block',
                                                                                              verticalAlign: 'top',
                                                                                              marginRight: '12px'
                                                                                          }}/><span
                                className="score">{info.foodScore}</span></div>
                            <div className="desc"><span className="name">送达时间</span><span
                                className="text">{info.deliveryTime}分钟</span></div>
                        </div>
                    </div>
                    <RatingSelect ratings={ratings} ref={rating => this.rating = rating}
                                  changeHeight={::this.changeHeight} style={{borderTop: '1px solid rgba(7,17,27,.1)'}}>
                        <RatingBody2 />
                    </RatingSelect>
                </div>
            </ReactBScroll>
            <ShopCart seller={info} selectFoods={selectFoods} addFood={goodActions.addFood}
                      removeFood={goodActions.removeFood} clearFoods={goodActions.clearFoods}/>
        </div>
    }
}

export default Ratings

