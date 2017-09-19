/**
 * Created by AllenFeng on 2017/9/19.
 */

import React from 'react';
import PropTypes from 'prop-types';

class MenuItem extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        menu: PropTypes.object
    }

    supportClassType = () => {
        return {
            0: 'decrease',
            1: 'discount',
            2: 'guarantee',
            3: 'invoice',
            4: 'special'
        }
    }

    render() {
        const {menu}=this.props;
        return <li className="menu-item border-1px">
                                <span className="text">{menu.type > -1 && <span
                                    className={`icon ${this.supportClassType()[menu.type]}`}></span>}{menu.name}</span>
        </li>
    }
}

export default MenuItem

