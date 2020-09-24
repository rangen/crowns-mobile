import React from 'react';
// import { observer } from 'mobx-react';
// import { useStore } from '../store';
import DistrictMap from '../components/DistrictMap';


const MainContainer = () => {
    // const store = useStore();

    return (
        <div style={{margin: '10px 0'}}>
            <DistrictMap />
        </div>
    );
};

export default MainContainer;