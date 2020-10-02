import React from 'react'
import { useStore } from '../store';
import states from '../misc/states';

const VotingResources = () => {
    const store = useStore();
    const { ballotInfoUrl, electionInfoUrl, votingLocationFinderUrl, absenteeVotingInfoUrl, electionNoticeUrl, electionNoticeText } = store.stateVotingInfo;

    return (
        <>
            <h3>{`${states[store.state]} Voting Resources`}</h3>
            <h5>(Links open in New Tab)</h5>
            
            {votingLocationFinderUrl && 
                <h4><a href={votingLocationFinderUrl} target='_blank' rel="noopener noreferrer">Voting Location Finder</a></h4>
            }
            {electionInfoUrl &&
                <h4><a href={electionInfoUrl} target='_blank' rel="noopener noreferrer">Election Info</a></h4>
            }
            {absenteeVotingInfoUrl &&
                <h4><a href={absenteeVotingInfoUrl} target='_blank' rel="noopener noreferrer">Absentee Voting Info</a></h4>
            }
            {ballotInfoUrl &&
                <h4><a href={ballotInfoUrl} target='_blank' rel="noopener noreferrer">Ballot Info</a></h4>
            }
            {electionNoticeUrl && electionNoticeText &&
                <>
                    <p>{electionNoticeText}</p> 
                    <h4><a href={electionNoticeUrl} target='_blank' rel="noopener noreferrer">Official Election Notice</a></h4>
                </>
            }
        </>
    ); 
}

export default VotingResources;
