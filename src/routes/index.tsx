import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';

import { ShowroomIndex } from '../App/Showroom/Showroom';
import { SphinxContainerFromStore }
    from '../App/Showroom/Sites/Sphinx/SphinxContainer';
import { CyclopsContainerFromStore }
    from '../App/Showroom/Sites/Cyclops/CyclopsContainer';
import { WorkshopFromStore } from '../Workshop/Workshop';

const routes = (
        <Route component={App}>
            <Route path="/showroom" component={ShowroomIndex}/>
            <Route path="/showroom/sphinx" component={SphinxContainerFromStore}/>
            <Route path="/showroom/cyclops" component={CyclopsContainerFromStore}/>
            {/*//examples*/}
            <Route path="/" component={WorkshopFromStore}/>
            <Route path="/:activePage" component={WorkshopFromStore}/>
        </Route>
);

export default routes;
