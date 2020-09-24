import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';
import MapIcon from '@material-ui/icons/Map';
import MenuSelection from './MenuSelection';

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
            <Drawer anchor='top' open={store.menuOpen} onClose={()=>store.menuOpen = false}>
              <List>
    <MenuSelection text='Home' icon={<MailIcon/>} value='home' />
                <Divider />
    <MenuSelection text='View My District' icon={<MapIcon/>} value='map' />
              </List>
            </Drawer>
        </div>
    );
});

export default MenuDrawer;
