/**
 * Created by AllenFeng on 2017/9/26.
 */

import React from 'react';

class Ball extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // const {onClose, index}=this.props;
        // this.closeTimer = setTimeout(() => {
        //     onClose();
        // }, 5000)
    }

    componentWillUnmount() {
       // clearTimeout(this.closeTimer);
    }

    render() {
        return <div className="ball">
            <div className="inner"></div>
        </div>
    }
}

export default Ball

