import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../containers/App';
import { Home } from '../containers/Home';
import {MainPageFromStore} from '../containers/MainPage';
import {store} from '../redux/stores/store';

const routes = (
        <Route component={App}>
            <Route path="/hey" component={MainPageFromStore}/>
        </Route>
);

export default routes;
