/**
 * Created by AllenFeng on 2017/9/30.
 */

import React from 'react';
import './ratingSelect.less';

class RatingSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterRatings: props.food.ratings.filter(r => r.text !== ''),
            type: 2,
            on: true
        }
    }

    static defaultProps = {
        selectTypeName: {
            all: '全部',
            good: '推荐',
            bad: '吐槽'
        },
        food: {}
    }

    render() {
        const {selectTypeName, food, changeHeight} = this.props;
        const {type, on} = this.state;
        return <div className="rating-select">
            <div className="rating-header">
                <ul className="tab-list">
                    <li className={`tab azure ${type == 2 ? 'active' : ''}`.trim()}
                        onClick={() => this.setState(preState => {
                            return {
                                type: 2,
                                filterRatings: food.ratings.filter(r => (preState.on ? r.text !== '' : true))
                            }
                        }, () => changeHeight())}>{selectTypeName.all}<span
                        className="count">{food.ratings.length}</span></li>
                    <li className={`tab azure ${type == 0 ? 'active' : ''}`.trim()}
                        onClick={() => this.setState(preState => {
                            return {
                                type: 0,
                                filterRatings: food.ratings.filter(r => r.rateType == 0 && (preState.on ? r.text !== '' : true))
                            }
                        }, () => changeHeight())}>{selectTypeName.good}<span
                        className="count">{food.ratings.filter(r => r.rateType == 0).length}</span></li>
                    <li className={`tab gray ${type == 1 ? 'active' : ''}`.trim()}
                        onClick={() => this.setState(preState => {
                            return {
                                type: 1,
                                filterRatings: food.ratings.filter(r => r.rateType == 1 && (preState.on ? r.text !== '' : true))
                            }
                        }, () => changeHeight())}>{selectTypeName.bad}<span
                        className="count">{food.ratings.filter(r => r.rateType == 1).length}</span></li>
                </ul>
                <div className="line border-1px"></div>
                <div className={`only-see-content ${on ? 'on' : ''}`.trim()} onClick={() => this.setState(preState => {
                        return {
                            on: !preState.on,
                            filterRatings: preState.type !== 2 ? food.ratings.filter(r => r.rateType == preState.type && (!preState.on ? r.text !== '' : true)) : food.ratings.filter(r => !preState.on ? r.text !== '' : true)
                        }
                    }, () => changeHeight()
                )}>
                    <i className="icon-check_circle"/>
                    <span className="text">只看有内容的评价</span>
                </div>
            </div>
            {React.cloneElement(this.props.children, {filterRatings: this.state.filterRatings})}
        </div>
    }
}

export default RatingSelect

