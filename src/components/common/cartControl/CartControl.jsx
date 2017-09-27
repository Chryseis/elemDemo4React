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
        count: 0
    }

    render() {
        const {count, addCart, decCart} = this.props;
        return <div className="cartcontrol">
            <Transition in={count > 0} timeout={{
                enter: 300,
                exit: 200
            }}>
                {
                    status => (
                        <div className={`dec icon-remove_circle_outline move ${status}`} onClick={decCart}></div>)
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
            <div className="add icon-add_circle" onClick={(e) => {
                addCart();
                addBall(e.target, {ball: 'ball'});
            }}></div>
        </div>
    }
}

export default CartControl

