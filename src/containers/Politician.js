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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const navTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#121858'
        },
        text: {
            secondary: '#808080'
        }
    }
})

const Politician = observer(() => {
    const store = useStore();
    const polTab = store.politicianTab;
  
    return (
        <>
        {polTab === 'info' && <CandidateInfo/>} 
        {polTab === 'finances' && <FinancialInfo/>} 
        {polTab === 'tweets' && <Tweets/>} 
        <ThemeProvider theme={navTheme}>
            <BottomNavigation
                value={polTab}
                onChange={(event, newValue) => {
                    store.setPoliticianTab(newValue);
                }}
                style={{
                    width: '70%',
                    position: 'fixed',
                    bottom: 0,
                }}
                showLabels
            >
                <BottomNavigationAction label={store.selectedPolitician.candidate_name} icon={<PersonIcon/>} value='info' />
                <BottomNavigationAction label='Financial Info' icon={<CashIcon/>} value='finances' />
                {store.polHasTweets && 
                    <BottomNavigationAction label='Tweets' color='secondary' icon={<TwitterIcon/>} value='tweets' />
                }
                </BottomNavigation>
        </ThemeProvider>
        </>
    )
});

export default Politician;