import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';
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
                <MenuSelection text='Find Polling Places' icon={<VoteIcon/>} value='polling'/>
                {store.addressResolved && 
                    <>
                        <MenuSelection text='View My District' icon={<MapIcon/>} value='map' />
                        <Divider />
                    </>
                }

                {store.senatorsLoaded && 
                    <SenatorMenu/>
                }
                {store.repsLoaded && 
                    <>
                        <RepMenu/>
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
