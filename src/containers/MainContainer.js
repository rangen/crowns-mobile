import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';


const MainContainer = observer(() => {
    const store = useStore();

    return (
        <>
            {store.district && `District: ${store.state}-${store.district}`}
        </>
    );
});

export default MainContainer;