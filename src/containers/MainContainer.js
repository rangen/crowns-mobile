import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';


const MainContainer = observer(() => {
    const store = useStore();

    return (
        <>
            <h4>
                {store.polygonLoaded && 'Shapes!'}
            </h4>
        </>
    );
});

export default MainContainer;