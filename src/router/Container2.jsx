/**
 * Created by AllenFeng on 2017/10/12.
 */

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-keeper'
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Header from '../components/layouts/header';
import Tab2 from '../components/layouts/tab/Tab2';
import Seller from '../components/layouts/seller';
import Goods from '../components/layouts/goods';
import Ratings from '../components/layouts/ratings';

const store = configureStore();

class Container2 extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Provider store={store}>
            <Router>
                <div className="app">
                    <Header />
                    <Tab2 />
                    <Route cache key="seller" path="/seller" component={Seller}/>
                    <Route cache index key="goods" path="/goods" component={Goods}/>
                    <Route cache  key="ratings" path="/ratings" component={Ratings}/>
                    <Route miss component={NoMatch}/>
                </div>
            </Router>
        </Provider>
    }
}

const NoMatch = () => <div>404</div>

export default Container2

