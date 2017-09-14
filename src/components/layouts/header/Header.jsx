/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Transition} from 'react-transition-group';
import * as SellerActionCreator from '../../../actions/seller';
import './header.less';
import Star from '../../common/star';

@connect((state) => ({
    seller: state.seller
}), (dispatch) => ({
    actions: bindActionCreators(SellerActionCreator, dispatch)
}))
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailVisible: false,
            in: false
        }
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

    showMask = (visible) => {
        this.setState({in: visible})
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
                    info.supports && info.supports.length > 0 &&
                    <div className="support-count" onClick={() => this.showMask(true)}>
                        <span className="count">{info.supports.length}个</span>
                        <i className="icon-keyboard_arrow_right"></i>
                    </div>
                }
            </div>
            <div className="bulletin-wrapper" onClick={() => this.showMask(true)}>
                <span className="bulletin-title"></span>
                <span className="bulletin-text">{info.bulletin}</span>
                <i className="icon-keyboard_arrow_right"></i>
            </div>
            <div className="background">
                <img src={info.avatar} width="100%" height="100%"/>
            </div>
            <Transition in={this.state.in} timeout={500}
                onEnter={()=>{
                    this.setState({
                        detailVisible:true
                    })
                }}
                onExited={()=>{
                    this.setState({
                        detailVisible:false
                    })
                }}
            >
                {
                    (status) => (<div className={`detail fade ${status}`}
                                      style={{display: this.state.detailVisible ? 'block' : 'none'}}>
                        <div className="detail-wrapper">
                            <div className="detail-main">
                                <h1 className="name">{info.name}</h1>
                                <Star className="star-container" score={info.score}/>
                                <div className="title">
                                    <div className="line"></div>
                                    <div className="text">优惠信息</div>
                                    <div className="line"></div>
                                </div>
                                {
                                    info.supports && info.supports.length > 0 && <ul className="supports">
                                        {
                                            _.map(info.supports, (support, i) => {
                                                return <li className="support-item" key={i}>
                                                    <span
                                                        className={`icon ${this.supportClassType()[support.type]}`}></span>
                                                    <span className="text">{support.description}</span>
                                                </li>
                                            })
                                        }
                                    </ul>
                                }
                                <div className="title">
                                    <div className="line"></div>
                                    <div className="text">商家公告</div>
                                    <div className="line"></div>
                                </div>
                                <div className="bulletin">
                                    <p className="content">{info.bulletin}</p>
                                </div>
                            </div>
                        </div>
                        <div className="detail-close" onClick={() => this.showMask(false)}>
                            <i className="icon-close"></i>
                        </div>
                    </div>)
                }
            </Transition>
        </div>
    }
}

export default Header

