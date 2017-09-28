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
        isBall: true
    }

    render() {
        const {count, addCart, decCart, isBall,style} = this.props;
        return <div className="cartcontrol" style={style}>
            <Transition in={count > 0} timeout={{
                enter: 300,
                exit: 200
            }}>
                {
                    status => (
                        <div className={`dec icon-remove_circle_outline move ${status}`} onClick={(e)=>{
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
            <div className="add icon-add_circle" onClick={(e) => {
                e.stopPropagation();
                isBall && addBall(e.target, {ball: 'ball'});
                addCart();
            }}></div>
        </div>
    }
}

export default CartControl

