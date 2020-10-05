import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import DistrictMap from '../components/DistrictMap';
import Politician from './Politician';
import Donate from './Donate';
import VotingResources from '../components/VotingResources';
import SecondaryMap from '../components/SecondaryMap';
import Home from '../containers/Home';

const MainContainer = observer(() => {
    const store = useStore();

    return (
        <div style={{margin: '10px 0px'}}>
            <div style={{display: (store.currentPage === 'map' ? 'inline' : 'none')}} >
                <DistrictMap />
            </div>
            <div style={{display: (store.currentPage === 'secondarymap' ? 'inline' : 'none')}} >
                <SecondaryMap />
            </div>
            {store.currentPage === 'home' && <Home/>}
            {store.currentPage === 'support' && <Donate/>}
            {store.currentPage === 'politician' && <><Politician/></>}
            {store.currentPage === 'about' && <>About yada yada!</>}
            {store.currentPage === 'resources' && <VotingResources/>}
        </div>
    );
});

export default MainContainer;