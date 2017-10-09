/**
 * Created by AllenFeng on 2017/9/30.
 */

import React from 'react';
import './ratingSelect.less';

class RatingSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterRatings: props.ratings.filter(r => r.text !== ''),
            type: 2,
            on: true
        }
    }

    static defaultProps = {
        selectTypeName: {
            all: '全部',
            good: '推荐',
            bad: '吐槽'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ratings.length !== this.props.ratings.length) {
            this.setState({
                filterRatings: nextProps.ratings.filter(r => r.text !== '')
            })
        }
    }

    render() {
        const {selectTypeName, ratings, changeHeight,style} = this.props;
        const {type, on} = this.state;
        return <div className="rating-select" style={style}>
            <div className="rating-header">
                <ul className="tab-list">
                    <li className={`tab-item azure ${type == 2 ? 'active' : ''}`.trim()}
                        onClick={() => this.setState(preState => {
                            return {
                                type: 2,
                                filterRatings: ratings.filter(r => (preState.on ? r.text !== '' : true))
                            }
                        }, () => changeHeight())}>{selectTypeName.all}<span
                        className="count">{ratings.length}</span></li>
                    <li className={`tab-item azure ${type == 0 ? 'active' : ''}`.trim()}
                        onClick={() => this.setState(preState => {
                            return {
                                type: 0,
                                filterRatings: ratings.filter(r => r.rateType == 0 && (preState.on ? r.text !== '' : true))
                            }
                        }, () => changeHeight())}>{selectTypeName.good}<span
                        className="count">{ratings.filter(r => r.rateType == 0).length}</span></li>
                    <li className={`tab-item gray ${type == 1 ? 'active' : ''}`.trim()}
                        onClick={() => this.setState(preState => {
                            return {
                                type: 1,
                                filterRatings: ratings.filter(r => r.rateType == 1 && (preState.on ? r.text !== '' : true))
                            }
                        }, () => changeHeight())}>{selectTypeName.bad}<span
                        className="count">{ratings.filter(r => r.rateType == 1).length}</span></li>
                </ul>
                <div className="line border-1px"></div>
                <div className={`only-see-content ${on ? 'on' : ''}`.trim()} onClick={() => this.setState(preState => {
                        return {
                            on: !preState.on,
                            filterRatings: preState.type !== 2 ? ratings.filter(r => r.rateType == preState.type && (!preState.on ? r.text !== '' : true)) : ratings.filter(r => !preState.on ? r.text !== '' : true)
                        }
                    }, () => changeHeight()
                )}>
                    <i className="icon-check_circle"/>
                    <span className="text">只看有内容的评价</span>
                </div>
            </div>
            {this.props.children && React.cloneElement(this.props.children, {filterRatings: this.state.filterRatings})}
        </div>
    }
}

export default RatingSelect

