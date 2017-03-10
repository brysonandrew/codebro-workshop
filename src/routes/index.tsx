import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';
import {Youtube} from '../Widgets/Youtube';
import {HomeFromStore} from '../Home/Home';
import {store} from '../redux/stores/store';

const routes = (
        <Route component={App}>
            <Route path="/youtube" component={Youtube}/>
            <Route path="/" component={HomeFromStore}/>
            <Route path="/:activePage" component={HomeFromStore}/>
            <Route path="/:activePage/:activeView" component={HomeFromStore}/>
        </Route>
);

export default routes;
