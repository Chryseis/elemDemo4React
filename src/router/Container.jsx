/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from '../components/layouts/header';
import Tab from '../components/layouts/tab';
import Seller from '../components/layouts/seller';
import Goods from '../components/layouts/goods';
import Ratings from '../components/layouts/ratings';


class Container extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Router>
            <div>
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
    }
}

export default Container

