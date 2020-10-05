import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AboutIcon from '@material-ui/icons/HelpOutline';
import LocalAtm from '@material-ui/icons/LocalAtm';
import VoteIcon from '@material-ui/icons/HowToVote';
import MenuSelection from './MenuSelection';
import RepMenu from './RepMenu';
import SenatorMenu from './SenatorMenu';
import gMapIcon from '../icons/googleMap.svg';
import poc from '../icons/crownsSmall.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const FixedMenu = observer(() => {
    const store = useStore();
    const classes = useStyles();

    return (
        <div className={classes.list}>
            <Drawer anchor='left' variant='permanent' className={classes.drawer} open>
              <List>
                <MenuSelection text='pileofcrowns.org' value='home' icon={<img alt='' src={poc}></img>}/>
                <Divider />
                <Divider />
                <Divider />
                {store.hasStateVotingInfo &&
                    <>
                        <MenuSelection icon={<VoteIcon style={{color: '#3949ab'}}/>} text={`${store.state} Voting Resources`} value='resources'/>
                    </>
                }
                {store.addressResolved && 
                    <>
                        <MenuSelection text='View My District' icon={<img alt='' src={gMapIcon}/>} value='map' />
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
                <Divider />
                <Divider />
                <Divider />

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
                <MenuSelection text='Support pileofcrowns.org' icon={<LocalAtm style={{color: '#7cb342'}}/>} value='support'/>
                <MenuSelection text='About Site' icon={<AboutIcon/>} value='about'/>
              </List>
            </Drawer>
        </div>
    );
});

export default FixedMenu;
