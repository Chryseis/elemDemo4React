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
import ShopCart from './ShopCart'
import Food from '../../common/food'

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
            currentIndex: 0,
            visible: false,
            good: {}
        }
    }

    componentDidMount() {
        const {actions} = this.props;
        actions.getGoods();
        this.firstMounted = true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(!deepEqual(nextState,this.state)){
          return true;
        } else if (!deepEqual(nextProps.goods, this.props.goods) || this.firstMounted) {
            return true;
        } else if (this.state.currentIndex == nextState.currentIndex && this.scrollY > -1) {
            return false;
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (!deepEqual(prevProps.goods.goodsInfo, this.props.goods.goodsInfo) || this.firstMounted) {
            this.menuScroll && this.menuScroll.destroy();
            this.foodScroll && this.foodScroll.destroy();
            this.firstMounted = false;
            this.listHeight = [];
            this.menuScroll = new BScroll(this.menuWrapper, {
                click: true
            });
            this.foodScroll = new BScroll(this.foodWrapper, {
                click: true,
                probeType: 3
            });

            let foodList = this.foodWrapper.getElementsByClassName('food-item-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.offsetHeight;
                this.listHeight.push(height);
            }
        }

        this.foodScroll && this.foodScroll.on('scroll', (pos) => {
            this.scrollY = Math.round(pos.y) < 0 ? Math.abs(Math.round(pos.y)) : 0;
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if ((!height2 || (this.scrollY >= height1 && this.scrollY < height2)) && this.scrollY > 0) {
                    this.setState({
                        currentIndex: i
                    }, () => {
                        //todo
                    });
                    return;
                }
            }
        })
    }

    selectMenu = (i) => {
        let foodList = this.foodWrapper.getElementsByClassName('food-item-hook');
        let info = foodList[i];
        this.foodScroll && this.foodScroll.scrollToElement(info, 300, 0, 2);
    }

    toggle = (good) => {
        this.setState(preState => {
            if (!preState.visible) {
                return {
                    visible: true,
                    good
                }
            } else {
                return {
                    visible: false
                }
            }
        })
    }


    render() {
        const {goodsInfo, selectFoods} = this.props.goods;
        const {info} = this.props.seller;
        const {actions} = this.props;
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
                <ul>
                    {
                        _.map(goodsInfo, (good, i) => {
                            return <FoodItem good={good} key={i} addFood={actions.addFood}
                                             removeFood={actions.removeFood} selectFoods={selectFoods}
                                             toggle={::this.toggle}/>
                        })
                    }
                </ul>
            </div>
            <ShopCart seller={info} selectFoods={selectFoods} addFood={actions.addFood}
                      removeFood={actions.removeFood} clearFoods={actions.clearFoods}/>
            <Food visible={this.state.visible} good={this.state.good} onClose={::this.toggle}/>
        </div>
    }
}

export default Goods

