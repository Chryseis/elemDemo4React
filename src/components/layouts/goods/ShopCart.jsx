/**
 * Created by AllenFeng on 2017/9/22.
 */

import React from 'react';

class ShopCart extends React.Component {
    constructor(props) {
        super(props)
        this.price = 0;
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

    render() {
        const {seller, selectFoods}=this.props;
        return <div className="shopcart">
            <div className="content">
                <div className="content-left">
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
        </div>
    }
}

export default ShopCart

