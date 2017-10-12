/**
 * Created by AllenFeng on 2017/10/12.
 */

import React from 'react';
import './tab.less';
import {CacheLink, Control} from 'react-keeper'

class Tab2 extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="tab border-1px">
            <CacheLink className="tab-item" isActive={Control.path == '/'|| Control.path =='goods'} activeClassName="active"
                       to="/goods">商品</CacheLink >
            <CacheLink className="tab-item" activeClassName="active" to="/ratings">评论</CacheLink >
            <CacheLink className="tab-item" activeClassName="active" to="/seller">商家</CacheLink >
        </div>
    }
}

export default Tab2

