/**
 * Created by AllenFeng on 2017/9/14.
 */

import React from 'react';
import './star.less';
import PropTypes from 'prop-types'

class Star extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starArr: []
        }
    }

    static propsTypes = {
        totalStar: PropTypes.number,
        score: PropTypes.number,
        size: PropTypes.number
    }

    static defaultProps = {
        totalStar: 5,
        score: 0,
        size: 48
    }

    componentDidMount() {
        this.renderStars(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.score !== nextProps.score) {
            this.renderStars(nextProps);
        }
    }

    renderStars = (props) => {
        const {totalStar, score, size}=props;
        let level = Math.floor(score * 2) / 2;
        let decimal = level % 1 !== 0;
        let starArr = [];
        for (let i = 0; i < level; i++) {
            starArr.push('on');
        }
        if (decimal) {
            starArr.push('half');
        }
        while (starArr.length < totalStar) {
            starArr.push('off')
        }
        this.setState({
            starArr
        })
    }

    render() {
        const {size, style}=this.props;
        const {starArr}=this.state;
        return <div className="star-container" style={style}>
            {
                _.map(starArr, (star, i) => {
                    return <span key={i} className={`star-item-${size} ${star}`}></span>
                })
            }
        </div>
    }
}

export default Star

