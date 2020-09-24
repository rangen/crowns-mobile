import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import DistrictMap from '../components/DistrictMap';


const MainContainer = observer(() => {
    const store = useStore();

    return (
        <div style={{margin: '10px 0'}}>
            <div style={{display: (store.currentPage === 'map' ? 'inline' : 'none')}} >
                <DistrictMap />
            </div>
            <Route path='/map'>
            </Route>
            <Switch>
            </Switch>
        </div>
    );
});

export default MainContainer;