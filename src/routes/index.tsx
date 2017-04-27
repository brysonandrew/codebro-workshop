import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';
import { WorkshopIndex } from '../App/Workshop/Workshop';
import { GatlingGunContainerFromStore }
from '../App/Workshop/Projects/GatlingGun/GatlingGunContainer';

import { ShowroomIndex } from '../App/Showroom/Showroom';
import { SphinxContainerFromStore }
from '../App/Showroom/Sites/Sphinx/SphinxContainer';

import { HomeFromStore } from '../Home/Home';

const routes = (
        <Route component={App}>
            <Route path="/showroom" component={ShowroomIndex}/>
            <Route path="/showroom/sphinx" component={SphinxContainerFromStore}/>

            <Route path="/workshop" component={WorkshopIndex}/>
            <Route path="/workshop/gatling-gun" component={GatlingGunContainerFromStore}/>

            <Route path="/" component={HomeFromStore}/>
            <Route path="/:activePage" component={HomeFromStore}/>
            <Route path="/:activePage/:activeView" component={HomeFromStore}/>
        </Route>
);

export default routes;
