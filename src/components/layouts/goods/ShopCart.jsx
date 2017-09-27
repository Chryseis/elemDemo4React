/**
 * Created by AllenFeng on 2017/9/22.
 */

import React from 'react';
import CartControl from '../../common/cartControl'

class ShopCart extends React.Component {
    constructor(props) {
        super(props)
        this.price = 0;
        this.state = {
            shopcartVisible: false
        }
    }

    totalPrice = (selectFoods) => {
        let totalPrice = 0;
        _.forEach(selectFoods, (food) => {
            totalPrice += food.price;
        })
        this.price = totalPrice;
        return totalPrice;
    }

    payDes = (seller) => {
        let diff = seller.minPrice - this.price;
        if (diff == seller.minPrice) {
            return {
                des: `￥${seller.minPrice}起送`,
                diff
            }
        } else if (diff > 0) {
            return {
                des: `还差￥${diff}起送`,
                diff
            }
        } else {
            return {
                des: `结算`,
                diff
            }
        }
    }

    groupBySelectFoods = (selectFoods) => {
        let groupbyFoods = [];
        _.forEach(selectFoods, (sfood) => {
            let i = _.findIndex(groupbyFoods, gfood => gfood.name == sfood.name);
            if (i > -1) {
                groupbyFoods[i].count++;
            } else {
                groupbyFoods.push({
                    name: sfood.name,
                    count: 1,
                    price: sfood.price
                })
            }
        })
        return groupbyFoods;
    }

    render() {
        const {seller, selectFoods, addFood, removeFood}=this.props;
        return <div className="shopcart">
            <div className="content">
                <div className="content-left" onClick={() => this.setState((preState) => {
                    return {
                        shopcartVisible: !preState.shopcartVisible
                    }
                })}>
                    <div className="logo-wrapper">
                        <div className={`logo ${selectFoods.length > 0 ? 'high-light' : ''}`}>
                            <span className="icon-shopping_cart"></span>
                        </div>
                        {selectFoods.length > 0 && <div className="num">{selectFoods.length}</div>}
                    </div>
                    <div
                        className={`price ${this.totalPrice(selectFoods) > 0 ? 'high-light' : ''}`}>{`￥${this.totalPrice(selectFoods)}`}</div>
                    <div className="desc">{`另需配送费￥${seller.deliveryPrice}元`}</div>
                </div>
                <div className="content-right">
                    <div className={`pay ${this.payDes(seller).diff > 0 ? 'not-enough' : 'enough'}`}>
                        {this.payDes(seller).des}
                    </div>
                </div>
            </div>
            <div className="shopcart-list"
                 style={{display: this.state.shopcartVisible && selectFoods.length > 0 ? 'block' : 'none'}}>
                <div className="list-header clearfix">
                    <h1 className="title">购物车</h1>
                    <span className="empty">清空</span>
                </div>
                <div className="list-content">
                    <ul>
                        {
                            _.map(this.groupBySelectFoods(selectFoods), (food, i) => {
                                return <li className="food clearfix" key={i}>
                                    <span className="name">{food.name}</span>
                                    <div className="cart-control">
                                        <span className="price">{`￥${food.count * food.price}`}</span>
                                        <CartControl style={{verticalAlign: 'middle',marginLeft:'12px'}} count={food.count}
                                                     addCart={addFood.bind(null, food)}
                                                     decCart={removeFood.bind(null, food)}/>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="shopcart-mask"
                 style={{display: this.state.shopcartVisible && selectFoods.length > 0 ? 'block' : 'none'}}>
            </div>
        </div>
    }
}

export default ShopCart

