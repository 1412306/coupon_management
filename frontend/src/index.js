import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Middleware from './middleware/middleware';
import RouteList from './modules/router'
import {Provider} from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Middleware>
                {RouteList.map((props, index) => <Route key={index} {...props} />)}
                </Middleware>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

