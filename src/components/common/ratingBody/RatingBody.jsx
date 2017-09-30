/**
 * Created by AllenFeng on 2017/9/30.
 */

import React from 'react';
import './ratingBody.less';
import moment from 'moment';

class RatingBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {filterRatings}=this.props;
        return <div className="rating-body">
            <ul>
                {
                    _.map(filterRatings, (rating,i) => (
                        <li className="rating-item border-1px" key={i}>
                            <div className="title clearfix">
                                <span className="time">{moment(rating.rateTime).format('YYYY-MM-MM HH:mm')}</span>
                                <div className="user"><span className="ic-card">{rating.username}</span><img
                                    className="avatar" src={rating.avatar} />
                                </div>
                            </div>
                            <div className="content">
                                <i className={`icon ${rating.rateType===0?"icon-thumb_up":"icon-thumb_down"}`} />
                                <span className="text">{rating.text}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    }
}

export default RatingBody

