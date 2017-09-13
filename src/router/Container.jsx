/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Header from '../components/layouts/header';
import Tab from '../components/layouts/tab';
import Seller from '../components/layouts/seller';
import Goods from '../components/layouts/goods';
import Ratings from '../components/layouts/ratings';


const store = configureStore();

class Container extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Provider store={store}>
            <Router>
                <div className="app">
                    <Header />
                    <Tab />
                    <Switch>
                        <Route exact path="/" render={(props) => <Seller {...props} />}/>
                        <Route exact path="/goods" render={(props) => <Goods {...props} />}/>
                        <Route exact path="/ratings" render={(props) => <Ratings {...props} />}/>
                        <Route render={() => <div>404</div>}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    }
}

export default Container

