/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SellerActionCreator from '../../../actions/seller';
import './header.less'

@connect((state) => ({
    seller: state.seller
}), (dispatch) => ({
    actions: bindActionCreators(SellerActionCreator, dispatch)
}))
class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {actions} = this.props;
        actions.getSeller();
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
        const {info} = this.props.seller;
        return <div className="header">
            <div className="content-wrapper">
                <div className="avatar">
                    <img src={info.avatar} width={64} height={64}/>
                </div>
                <div className="content">
                    <div className="title">
                        <span className="brand"></span>
                        <span className="name">{info.name}</span>
                    </div>
                    <div className="description">
                        {`${info.description}/${info.deliveryTime}`}分钟送达
                    </div>
                    {
                        info.supports && info.supports.length > 0 && <div className="support">
                            <span className={`icon ${this.supportClassType()[info.supports[0].type]}`}></span>
                            <span
                                className="text">{info.supports[0].description}</span>
                        </div>
                    }
                </div>
                {
                    info.supports && info.supports.length > 0 && <div className="support-count">
                        <span className="count">{info.supports.length}个</span>
                        <i className="icon-keyboard_arrow_right"></i>
                    </div>
                }
            </div>
            <div className="bulletin-wrapper">
                <span className="bulletin-title"></span>
                <span className="bulletin-text">{info.bulletin}</span>
                <i className="icon-keyboard_arrow_right"></i>
            </div>
            <div className="background">
                <img src={info.avatar} width="100%" height="100%"/>
            </div>
        </div>
    }
}

export default Header

