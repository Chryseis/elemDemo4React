/**
 * Created by AllenFeng on 2017/10/9.
 */

import React from 'react';
import './ratingBody2.less';
import Star from '../../common/star';
import moment from 'moment';

class RatingBody2 extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {filterRatings}=this.props;
        return <div className="rating-body">
            <ul>
                { _.map(filterRatings, (rating, i) =>
                    (
                        <li className="rating2-item border-1px" key={i}>
                            <div className="avatar"><img src={rating.avatar}/></div>
                            <div className="desc">
                                <div className="info clearfix"><span className="name">{rating.username}</span><span className="time">{moment(rating.rateTime).format('YYYY-MM-DD HH:mm')}</span></div>
                                <div className="level">
                                    <Star size={24} score={rating.score} style={{display: 'inline-block'}}/><span
                                    className="delivery-time">{`${rating.deliveryTime}分钟送达`}</span>
                                </div>
                                <p className="text">{rating.text}</p>
                                <div className="recommend"><i
                                    className={`icon ${rating.rateType === 0 ? "icon-thumb_up" : "icon-thumb_down"}`}/>
                                        {
                                            _.map(rating.recommend, (item, i) => (
                                                <span className="tag" key={i}>{item}</span>
                                            ))
                                        }
                                </div>
                            </div>
                        </li>
                    )
                )}
            </ul>
        </div>
    }
}

export default RatingBody2

