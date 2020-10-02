import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AboutIcon from '@material-ui/icons/HelpOutline';
import MapIcon from '@material-ui/icons/Map';
import LocalAtm from '@material-ui/icons/LocalAtm';
import VoteIcon from '@material-ui/icons/HowToVote';
import MenuSelection from './MenuSelection';
import RepMenu from './RepMenu';
import SenatorMenu from './SenatorMenu';

const useStyles = makeStyles({
    list:   {
        width:  250
    },
    fullList:   {
        width:  'auto'
    }
});

const MenuDrawer = observer(() => {
    const store = useStore();
    const classes = useStyles();

    return (
        <div className={classes.list}>
            <Drawer anchor='left' open={store.menuOpen} onClose={()=>store.menuOpen = false}>
              <List>
                <MenuSelection text='pileofcrowns.org' value='home' />
                <Divider />
                <Divider />
                <Divider />
                {store.hasStateVotingInfo &&
                    <>
                        <MenuSelection text={`${store.state} Voting Resources`} value='resources'/>
                    </>
                }
                {store.hasDropOffLocations &&
                    <>
                        <MenuSelection text={'Ballot Drop Off Locations'} value='dropoff'/>
                    </>
                }
                {store.hasEarlyVotingSites &&
                    <>
                        <MenuSelection text={'Early Voting Sites'} value='earlyvoting'/>
                    </>
                }
                {store.hasPollingPlaces &&
                    <>
                        <MenuSelection text={'Nov 3rd Polling Places'} value='polling'/>
                    </>
                }
                {store.addressResolved && 
                    <>
                        <MenuSelection text='View My District' icon={<MapIcon/>} value='map' />
                        <Divider />
                        <Divider />
                        <Divider />
                    </>
                }

                {store.senatorsLoaded && 
                    <>
                        <SenatorMenu/>
                        <Divider/>
                        <Divider/>
                        <Divider/>
                    </>
                }
                {store.repsLoaded && 
                    <>
                        <RepMenu/>
                        <Divider/>
                        <Divider/>
                        <Divider/>
                    </>
                }
                <MenuSelection text='Support' icon={<LocalAtm/>} value='support'/>
                <MenuSelection text='About this Site' icon={<AboutIcon/>} value='about'/>
              </List>
            </Drawer>
        </div>
    );
});

export default MenuDrawer;
