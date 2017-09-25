/**
 * Created by AllenFeng on 2017/9/22.
 */

import React from 'react';
import './cartControl.less';
import {Transition, TransitionGroup, CSSTransition} from 'react-transition-group'

class CartControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balls: []
        }
    }

    static defaultProps = {
        count: 0
    }

    render() {
        const {count, addCart, decCart} = this.props;
        return <div className="cartcontrol">
            <Transition in={count > 0} timeout={{
                enter: 300,
                exit: 200
            }}>
                {
                    status => (<div className={`dec icon-remove_circle_outline move ${status}`} onClick={decCart}></div>
                    )
                }
            </Transition>
            <Transition in={count > 0} timeout={{
                enter: 400,
                exit: 100
            }}>
                {
                    status => (<div className={`count fade ${status}`}>{count > 0 && count}</div>)
                }
            </Transition>
            <div className="add icon-add_circle" onClick={()=>{
                addCart();
                this.state.balls.push('ball');
                this.setState({
                    balls:this.state.balls
                })
            }} ref={add => this.addElem = add}></div>
            <div className="ball-container">
                <TransitionGroup component="span">
                    {
                        _.map(this.state.balls, (ball, i) => {
                            return <CSSTransition
                                key={i}
                                onEnter={(elem) => {
                                    let rect = this.addElem.getBoundingClientRect();
                                    let x = rect.left - 32;
                                    let y = -(window.innerHeight - rect.top - 22);
                                    elem.style.webkitTransform = `translate3d(${x}px,${y}px,0)`;
                                    elem.style.transform = `translate3d(${x}px,${y}px,0)`
                                }
                                }
                                onEntering={(elem) => {
                                    elem.style.webkitTransform = `translate3d(0,0,0)`;
                                    elem.style.transform = `translate3d(0,0,0)`
                                }
                                }
                                onEntered={(elem) => {
                                    elem.style.webkitTransform = `translate3d(0,0,0)`;
                                    elem.style.transform = `translate3d(0,0,0)`
                                }
                                }
                                timeout={400}
                                classNames="ball-drop"
                            >
                                <div className="ball"></div>
                            </CSSTransition>
                        })
                    }
                </TransitionGroup>
            </div>
        </div>
    }
}

export default CartControl

