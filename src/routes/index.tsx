import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';
import {HomeFromStore} from '../Home/Home';
import {store} from '../redux/stores/store';

const routes = (
        <Route component={App}>
            <Route path="/" component={HomeFromStore}/>
        </Route>
);

export default routes;
