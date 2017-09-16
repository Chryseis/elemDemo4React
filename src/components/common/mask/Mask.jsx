/**
 * Created by AllenFeng on 2017/9/15.
 */

import React from 'react';
import './mask.less';
import createContainer from '../../../common/js/createContainer';
import {Transition} from 'react-transition-group';

@createContainer
class Mask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailVisible: props.visible
        }
    }

    render() {
        const {visible,onClose}=this.props;
        return <Transition appear in={visible} timeout={500}
                           onEnter={() => {
                               this.setState({
                                   detailVisible: true
                               })
                           }}
                           onExited={() => {
                               setTimeout(() => {
                                   this.setState({
                                       detailVisible: false
                                   })
                               }, 500)
                           }}
        >
            {
                (status) => (<div className={`detail fade ${status}`}
                                  style={{display: this.state.detailVisible ? 'block' : 'none'}}>
                    <div className="detail-wrapper">
                        {this.props.children}
                    </div>
                    <div className="detail-close" onClick={onClose}>
                        <i className="icon-close"></i>
                    </div>
                </div>)
            }
        </Transition>
    }
}

export default Mask

