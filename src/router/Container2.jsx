/**
 * Created by AllenFeng on 2017/10/12.
 */

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-keeper'
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore2';
import Header from '../components/layouts/header';
import Tab2 from '../components/layouts/tab/Tab2';
import {LoadGoods, LoadRatings, LoadSeller} from './dynamicComponent'

class Container2 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Provider store={configureStore}>
            <Router>
                <div className="app">
                    <Header />
                    <Tab2 />
                    <Route key="seller" path="/seller" component={LoadSeller}/>
                    <Route cache index key="goods" path="/goods" component={LoadGoods}/>
                    <Route key="ratings" path="/ratings" component={LoadRatings}/>
                    <Route miss component={NoMatch}/>
                </div>
            </Router>
        </Provider>
    }
}

const NoMatch = () => <div>404</div>

export default Container2

