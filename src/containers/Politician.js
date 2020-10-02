import React from 'react'
import { observer } from 'mobx-react';
import { useStore } from '../store';

const Politician = observer(() => {
    const store = useStore();
    
    return (
        <>
            {store.selectedPolitician.candidate_name}  
        </>
    )
});

export default Politician;