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
        const {menu, currentIndex, index, onClick}=this.props;
        return <li className={`menu-item ${index == currentIndex ? 'current' : ''}`} onClick={onClick}>
                                <span className="text border-1px">{menu.type > -1 && <span
                                    className={`icon ${this.supportClassType()[menu.type]}`}></span>}{menu.name}</span>
        </li>
    }
}

export default MenuItem

