import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';
import { WorkshopFromStore } from '../Workshop/Workshop';

const routes = (
        <Route component={App}>
            <Route path="/" component={WorkshopFromStore}/>
            <Route path="/:activePage" component={WorkshopFromStore}/>
        </Route>
);

export default routes;
