/**
 * Created by AllenFeng on 2017/9/25.
 */

import React from 'react';
import ReactDOM from 'react-dom'
import './balls.less';
import {TransitionGroup, CSSTransition}  from 'react-transition-group'

class Balls extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            balls: []
        }
    }

    add = (ball) => {
        this.setState(preState => {
            return {
                balls: preState.balls.concat(ball)
            }
        })
    }


    render() {
        const {rect}=this.props;
        let x = rect.left - 32 + 12;
        let y = -(window.innerHeight - rect.top - 22 - 24);
        return <div className="ball-container">
            <TransitionGroup component="span">
                {
                    _.map(this.state.balls, (ball, i) => {
                        return <CSSTransition
                            in={false}
                            key={i}
                            onEnter={(elem) => {
                                elem.style.webkitTransform = `translate3d(${x}px,${y}px,0)`;
                                elem.style.transform = `translate3d(${x}px,${y}px,0)`
                            }
                            }
                            onEntering={(elem) => {
                                elem.style.webkitTransform = `translate3d(${x}px,${y}px,0)`;
                                elem.style.transform = `translate3d(${x}px,${y}px,0)`;
                            }
                            }
                            onEntered={(elem) => {
                                elem.style.webkitTransform = `translate3d(0,0,0)`;
                                elem.style.transform = `translate3d(0,0,0)`
                            }
                            }
                            onExit={(elem) => {
                                elem.style.opacity = 0;
                            }}
                            onExiting={(elem) => {
                                elem.style.opacity = 0;
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
    }
}

Balls.newIntstance = function (properties) {
    const {...props}=properties;
    let div = document.createElement('div');
    document.body.appendChild(div);

    const balls = ReactDOM.render(<Balls {...props} />, div);
    return {
        add(ball){
            balls.add(ball)
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }
}

export default Balls

