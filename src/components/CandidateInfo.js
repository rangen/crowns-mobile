import React from 'react'
import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useStore } from '../store';

const CandidateInfo = observer(() => {
    const store = useStore();
    const p = store.selectedPolitician;
    const parties = {
        'SOC':  'Socialist',
        'DEM':  'Democratic',
        'REP':  'Republican',
        'LIB':  'Libertarian',
        'GRN':  'Green',
        'IND':  'Independent'
    }

    return (
        <div style={{marginBottom: 60}}>
            <img src={p.photo_url} alt={p.candidate_name}></img>
            <Typography>{p.candidate_name}</Typography>
            <Typography>{`Party: ${parties[p.party] || 'Unknown'}`}</Typography>
            <Typography>{`Status: ${p.incumbent === 'I' ? 'Incumbent' : 'Challenger'}`}</Typography>

        </div>
    )
});

export default CandidateInfo
