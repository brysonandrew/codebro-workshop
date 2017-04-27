import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';
import { WorkshopIndex } from '../App/Workshop/Workshop';
import { GatlingGunContainerFromStore }
from '../App/Workshop/Projects/GatlingGun/GatlingGunContainer';
import { GConsultingContainerFromStore }
from '../App/Workshop/Projects/GConsulting/GConsultingContainer';

import { HomeFromStore } from '../Home/Home';

const routes = (
        <Route component={App}>

            <Route path="/workshop" component={WorkshopIndex}/>
            <Route path="/workshop/gatling-gun" component={GatlingGunContainerFromStore}/>
            <Route path="/workshop/g-consulting" component={GConsultingContainerFromStore}/>

            <Route path="/" component={HomeFromStore}/>
            <Route path="/:activePage" component={HomeFromStore}/>
            <Route path="/:activePage/:activeView" component={HomeFromStore}/>
        </Route>
);

export default routes;
