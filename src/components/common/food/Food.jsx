/**
 * Created by AllenFeng on 2017/9/28.
 */

import React from 'react';
import './food.less';
import createContainer from '../../../common/js/createContainer';
import {Transition} from 'react-transition-group';
import CartControl from '../../common/cartControl';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import RatingSelect from '../ratingSelect';
import RatingBody from '../ratingBody'

const options = {
    fadeScrollbars: true,
    click: true,
    taps: true
}

@createContainer
class Food extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canVerticallyScroll: null
        }
    }

    getCount = (selectFoods, food) => {
        let filterFoods = _.filter(selectFoods, (selectFood) => {
            return selectFood.name == food.name
        })
        return filterFoods.length;
    }

    render() {
        const {visible, food, onClose, removeMask, addFood, removeFood, selectFoods}=this.props;
        return <Transition in={visible} appear timeout={400}>
            {status => (
                <div className={`food-slider slider ${status}`}>
                    <ReactIScroll iScroll={iScroll} options={options} onRefresh={(iScrollInstance) => {
                        let hasVerticalScroll = iScrollInstance.y;
                        if (this.state.canVerticallyScroll != hasVerticalScroll) {
                            this.setState({canVerticallyScroll: hasVerticalScroll})
                        }
                    }}>
                        <div>
                            <div className="food-image" style={{backgroundImage: `url(${food.image})`}}>
                                <i className="icon-keyboard_arrow_right" onClick={() => {
                                    onClose(null, () => {
                                        setTimeout(removeMask, 800)
                                    })
                                }}/>
                            </div>
                            <div className="food-detail">
                                <div className="food-name">{food.name}</div>
                                <div className="food-rating"><span
                                    className="seller-count">{`月售${food.sellCount}份`}</span><span
                                    className="rating">{`好评率${food.rating}%`}</span></div>
                                <div className="operabar clearfix">
                                    <span className="price">{`￥${food.price}元`}{food.oldPrice !== '' &&
                                    <span className="oldprice">{`￥${food.oldPrice}元`}</span>}</span>
                                    <div className="cart-wrapper">
                                        <CartControl addCart={addFood.bind(null, food)}
                                                     decCart={removeFood.bind(null, food)}
                                                     count={this.getCount(selectFoods, food)} type={2}/>
                                    </div>
                                </div>
                            </div>
                            <div className="food-description">
                                <h1 className="title">商品介绍</h1>
                                <div className="content">{food.info}</div>
                            </div>
                            <div className="food-evalute">
                                <h1 className="title">商品评价</h1>
                            </div>
                            <RatingSelect food={food}>
                                <RatingBody />
                            </RatingSelect>
                        </div>
                    </ReactIScroll>
                </div>
            )}
        </Transition>

    }
}

export default Food

