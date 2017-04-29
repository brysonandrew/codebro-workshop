import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';

import { ShowroomIndex } from '../App/Showroom/Showroom';
import { SphinxContainerFromStore }
    from '../App/Showroom/Sites/Sphinx/SphinxContainer';

import { WorkshopIndex } from '../App/Workshop/Workshop';
import { GatlingGunContainerFromStore }
from '../App/Workshop/Projects/GatlingGun/GatlingGunContainer';
import { WalkingPhysicsContainerFromStore }
from '../App/Workshop/Projects/WalkingPhysics/WalkingPhysicsContainer';
import  { TransitionContainerFromStore }
from '../App/Workshop/Examples/Transition/TransitionContainer';

import { HomeFromStore } from '../Home/Home';

const routes = (
        <Route component={App}>
            <Route path="/showroom" component={ShowroomIndex}/>
            <Route path="/showroom/sphinx" component={SphinxContainerFromStore}/>

            <Route path="/workshop" component={WorkshopIndex}/>
            <Route path="/workshop/gatling-gun" component={GatlingGunContainerFromStore}/>
            <Route path="/workshop//workshop/walking-physics" component={WalkingPhysicsContainerFromStore}/>
            <Route path="/workshop/transition-crash-test" component={TransitionContainerFromStore}/>

            <Route path="/" component={HomeFromStore}/>
            <Route path="/:activePage" component={HomeFromStore}/>
            <Route path="/:activePage/:activeView" component={HomeFromStore}/>
        </Route>
);

export default routes;
