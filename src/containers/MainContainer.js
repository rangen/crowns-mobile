import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';


const MainContainer = observer(() => {
    const store = useStore();

    return (
        <>
            Main Container stuff;
        </>
    );
});

export default MainContainer;