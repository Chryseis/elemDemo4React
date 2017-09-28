/**
 * Created by AllenFeng on 2017/9/28.
 */

import React from 'react';
import './food.less';
import createContainer from '../../../common/js/createContainer';
import {Transition} from 'react-transition-group';


@createContainer
class Food extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {visible, good, onClose, removeMask}=this.props;
        return <Transition in={visible} appear timeout={400}>
            {status => (<div className={`food toggle ${status}`}>
                <div className="food-image" onClick={() => {
                    onClose(null, () => {
                        setTimeout(() => {
                            removeMask();
                        }, 800)
                    });
                }}>xxx
                </div>
                <div className="food-detail">
                    <div className="food-name"></div>
                    <div className="food-rating"></div>
                </div>
            </div>)}
        </Transition>
    }
}

export default Food

