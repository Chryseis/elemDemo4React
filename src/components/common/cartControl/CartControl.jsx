/**
 * Created by AllenFeng on 2017/9/22.
 */

import React from 'react';
import './cartControl.less';

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
            {count > 0 && <div className="dec icon-remove_circle_outline" onClick={(e) => {
                e.stopPropagation();
                decCart();
            }}></div>}
            {count > 0 && <div className="count">{count}</div>}
            <div className="add icon-add_circle" onClick={(e) => {
                e.stopPropagation();
                addCart();
            }}></div>
        </div>
    }
}

export default CartControl

