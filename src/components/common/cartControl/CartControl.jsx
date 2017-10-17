/**
 * Created by AllenFeng on 2017/9/22.
 */

import React from 'react';
import './cartControl.less';
import {Transition} from 'react-transition-group';
import addBall from '../balls'

class CartControl extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        count: 0,
        isBall: true,
        type: 1
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.count !== this.props.count) {
            return true;
        }
        return false

    }


    render() {
        const {count, addCart, decCart, isBall, style, type} = this.props;
        return <div className="cartcontrol" style={style}>
            <Transition in={count > 0} timeout={{
                enter: 300,
                exit: 200
            }}>
                {
                    status => (
                        <div className={`dec icon-remove_circle_outline move ${status}`} onClick={(e) => {
                            e.stopPropagation();
                            decCart();
                        }}></div>)
                }
            </Transition>
            <Transition in={count > 0} timeout={{
                enter: 400,
                exit: 100
            }}>
                {
                    status => (<div className={`count fade ${status}`}>{count > 0 && count}</div>)
                }
            </Transition>
            {
                (type == 1 || count > 0) && <div className="add icon-add_circle" onClick={(e) => {
                    e.stopPropagation();
                    isBall && addBall(e.target, {ball: 'ball'});
                    addCart();
                }}></div>
            }
            {
                (type == 2 && count == 0) && <div className="add-text" onClick={(e) => {
                    e.stopPropagation();
                    isBall && addBall(e.target, {ball: 'ball'});
                    addCart();
                }}>加入购物车</div>
            }

        </div>
    }
}

export default CartControl

