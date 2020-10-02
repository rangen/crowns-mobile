import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import DistrictMap from '../components/DistrictMap';
import Politician from './Politician';
import Donate from './Donate';

const MainContainer = observer(() => {
    const store = useStore();

    return (
        <div style={{margin: '10px 0'}}>
            <div style={{display: (store.currentPage === 'map' ? 'inline' : 'none')}} >
                <DistrictMap />
            </div>
            {store.currentPage === 'home' && <>Home</>}
            {store.currentPage === 'support' && <Donate/>}
            {store.currentPage === 'politician' && <><Politician/></>}
            {store.currentPage === 'polling' && <>Polling!</>}
            {store.currentPage === 'about' && <>About yada yada!</>}
        </div>
    );
});

export default MainContainer;