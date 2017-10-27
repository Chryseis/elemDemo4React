/**
 * Created by AllenFeng on 2017/10/27.
 */
import React from 'react';
import loadSeller from 'bundle-loader?lazy!../components/layouts/seller';
import loadGoods from 'bundle-loader?lazy!../components/layouts/goods';
import loadRatings from 'bundle-loader?lazy!../components/layouts/ratings';
import Bundle from '../components/common/bundle';


const LoadSeller = (props) => <Bundle load={loadSeller}>{Seller => <Seller {...props}/>}</Bundle>

const LoadGoods = (props) => <Bundle load={loadGoods}>{Goods => <Goods {...props}/>}</Bundle>

const LoadRatings = (props) => <Bundle load={loadRatings}>{Ratings => <Ratings {...props}/>}</Bundle>

export {
    LoadSeller,
    LoadGoods,
    LoadRatings
}