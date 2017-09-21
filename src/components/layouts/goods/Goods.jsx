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
import deepEqual from 'deep-equal'

@connect(state => ({
    seller: state.seller,
    goods: state.goods
}), dispatch => ({
    actions: bindActionCreators(GoodsActionCreator, dispatch)
}))
class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.scrollY = 0;
        this.state = {
            currentIndex: 0
        }
    }

    componentDidMount() {
        const {actions} = this.props;
        actions.getGoods();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.currentIndex == nextState.currentIndex && this.scrollY != 0) {
            return false;
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (!deepEqual(prevProps.goods.goodsInfo, this.props.goods.goodsInfo)) {
            this.menuScroll && this.this.menuScroll.destroy();
            this.foodScroll && this.this.foodScroll.destroy();
            this.listHeight = [];
            this.menuScroll = new BScroll(this.menuWrapper, {
                click: true
            });
            this.foodScroll = new BScroll(this.foodWrapper, {
                probeType: 3
            });

            let foodList = this.foodWrapper.getElementsByClassName('food-item-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        }

        this.foodScroll && this.foodScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    this.setState({
                        currentIndex: i
                    });
                    break;
                }
            }
        })
    }

    selectMenu=(i)=>{
        let foodList = this.foodWrapper.getElementsByClassName('food-item-hook');
        let info=foodList[i];
        this.foodScroll&&this.foodScroll.scrollToElement(info,300);
    }


    render() {
        const {goodsInfo} = this.props.goods;
        return <div className="goods">
            <div className="menu-wrapper" ref={menuWrapper => this.menuWrapper = menuWrapper}>
                <ul>
                    {
                        _.map(goodsInfo, (good, i) => {
                            return <MenuItem menu={good} key={i} currentIndex={this.state.currentIndex} index={i}
                                             onClick={() => this.selectMenu(i)}/>
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

