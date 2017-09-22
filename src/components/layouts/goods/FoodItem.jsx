/**
 * Created by AllenFeng on 2017/9/19.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CartControl from '../../common/cartControl'

class FoodItem extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        good: PropTypes.object
    }

    getCount = (selectFoods, food) => {
        let filterFoods = _.filter(selectFoods, (selectFood) => {
            return selectFood.name == food.name
        })
        return filterFoods.length;

    }

    render() {
        const {good, addFood, removeFood, selectFoods} = this.props;
        return <li className="food-list food-item-hook">
            <h1 className="title">{good.name}</h1>
            <ul>
                {
                    _.map(good.foods, (food, i) => {
                        return <li className="food-item border-1px" key={i}>
                            <div className="icon">
                                <img width={57} height={57} src={food.icon}/>
                            </div>
                            <div className="content">
                                <h2 className="name">{food.name}</h2>
                                <p className="desc">{food.description}</p>
                                <div className="extra">
                                    <span className="count">{`月售${food.sellCount}`}</span>
                                    <span>{`好评率${food.rating}%`}</span>
                                </div>
                                <div className="price">
                                    <span className="now">{`￥${food.price}`}</span>
                                    {food.oldPrice && <span className="old">{`￥${food.oldPrice}`}</span>}
                                </div>
                                <div className="cart-wrapper">
                                    <CartControl addCart={addFood.bind(null, food)}
                                                 decCart={removeFood.bind(null, food)}
                                                 count={this.getCount(selectFoods, food)}/>
                                </div>
                            </div>
                        </li>
                    })
                }
            </ul>
        </li>
    }
}

export default FoodItem

