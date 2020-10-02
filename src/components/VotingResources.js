import React from 'react'
import { useStore } from '../store';
import states from '../misc/states';

const VotingResources = () => {
    const store = useStore();
    const { ballotInfoUrl, electionInfoUrl, votingLocationFinderUrl } = store.stateVotingInfo;

    return (
        <>
            <h3>{`${states[store.state]} Voting Links`}</h3>
            <h5>(Links open in New Tab)</h5>
            
            {votingLocationFinderUrl && 
                <h4><a href={votingLocationFinderUrl} target='_blank'>Voting Location Finder</a></h4>
            }
            {electionInfoUrl &&
                <h4><a href={electionInfoUrl} target='_blank'>Election Info</a></h4>
            }
            {ballotInfoUrl &&
                <h4><a href={ballotInfoUrl} target='_blank'>Ballot Info</a></h4>
            }
        </>
    ); 
}

export default VotingResources;
