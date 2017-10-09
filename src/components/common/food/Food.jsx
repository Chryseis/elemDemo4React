/**
 * Created by AllenFeng on 2017/9/28.
 */

import React from 'react';
import ReactDOM from 'react-dom'
import './food.less';
import createContainer from '../../../common/js/createContainer';
import {Transition} from 'react-transition-group';
import CartControl from '../../common/cartControl';
import RatingSelect from '../ratingSelect';
import RatingBody from '../ratingBody';
import bScroll from 'better-scroll';
import ReactBScroll from '../scrollbar';

const options = {
    click: true
}

@createContainer
class Food extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canVerticallyScroll: null,
            height: true
        }
        this.ratingHeight = 0;
    }

    getCount = (selectFoods, food) => {
        let filterFoods = _.filter(selectFoods, (selectFood) => {
            return selectFood.name == food.name
        })
        return filterFoods.length;
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
        const {visible, food, onClose, removeMask, addFood, removeFood, selectFoods} = this.props;
        return <Transition in={visible} appear timeout={400}>
            {status => (
                <div className={`food-slider slider ${status}`}>
                    <ReactBScroll bScroll={bScroll} options={options} onRefresh={(iScrollInstance) => {
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
                            <RatingSelect ratings={food.ratings} ref={rating => this.rating = rating}
                                          changeHeight={::this.changeHeight}>
                                <RatingBody />
                            </RatingSelect>
                        </div>
                    </ReactBScroll>
                </div>
            )}
        </Transition>

    }
}

export default Food

