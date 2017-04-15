import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';
import { Workshop } from '../App/Workshop/Workshop';
import {Youtube} from '../Widgets/Youtube';
import {HomeFromStore} from '../Home/Home';
import {store} from '../redux/stores/store';

const routes = (
        <Route component={App}>
            <Route path="/workshop/logo" component={Workshop}/>
            <Route path="/youtube" component={Youtube}/>
            <Route path="/" component={HomeFromStore}/>
            <Route path="/:activePage" component={HomeFromStore}/>
            <Route path="/:activePage/:activeView" component={HomeFromStore}/>
        </Route>
);

export default routes;
