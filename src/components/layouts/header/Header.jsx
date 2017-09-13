/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SellerActionCreator from '../../../actions/seller'

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
        const {actions}=this.props;
        actions.getSeller();
    }

    render() {
        console.log(this.props.seller)
        return <div>header</div>
    }
}

export default Header

