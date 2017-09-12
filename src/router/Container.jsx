/**
 * Created by AllenFeng on 2017/9/12.
 */

import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import Hello from '../components/Hello'


class Container extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Router>
            <div>
                <Switch>
                    <Route exact path="/" render={(props) => <Hello {...props} />}/>
                    <Route render={()=><div>404</div>}></Route>
                </Switch>
            </div>
        </Router>
    }
}

export default Container

