/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import {NavLink} from 'react-router-dom';
import './tab.less'

class Tab extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='tab border-1px'>
            <NavLink exact className='tab-item' to='/'>商品</NavLink >
            <NavLink exact className='tab-item' to='/goods'>评论</NavLink >
            <NavLink exact className='tab-item' to='/ratings'>商家</NavLink >
        </div>
    }
}

export default Tab

