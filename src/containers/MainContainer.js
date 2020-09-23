import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import DistrictMap from '../components/DistrictMap';


const MainContainer = observer(() => {
    const store = useStore();

    return (
        <>
            {`Map script is loaded: ${store.mapScriptLoaded}`}
            <DistrictMap />
        </>
    );
});

export default MainContainer;