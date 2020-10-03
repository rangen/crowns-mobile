import React from 'react'
import { observer } from 'mobx-react';
import { useStore } from '../store';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import PersonIcon from '@material-ui/icons/Person';
import CashIcon from '@material-ui/icons/LocalAtm';
import CandidateInfo from '../components/CandidateInfo';
import FinancialInfo from '../components/FinancialInfo';
import Tweets from '../components/Tweets';

const Politician = observer(() => {
    const [value, setValue] = React.useState('info');
    const store = useStore();
    
    return (
        <>
        {value === 'info' && <CandidateInfo/>} 
        {value === 'finances' && <FinancialInfo/>} 
        {value === 'tweets' && <Tweets/>} 
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            style={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
              }}
            showLabels
        >
            <BottomNavigationAction label={store.selectedPolitician.candidate_name} icon={<PersonIcon/>} value='info' />
            <BottomNavigationAction label='Financial Info' icon={<CashIcon/>} value='finances' />
            <BottomNavigationAction label='Tweets' icon={<TwitterIcon/>} value='tweets' />
        </BottomNavigation>
        </>
    )
});

export default Politician;