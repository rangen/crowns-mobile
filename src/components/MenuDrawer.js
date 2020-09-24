import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';

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
            <Drawer 
                anchor='top'
                open={store.menuOpen}
                onClose={()=>store.menuOpen = false}
            >
                <List>
          <ListItem button key="home">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="profile">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="View My District" />
          </ListItem>
        </List>
            </Drawer>
        </div>
    );
});

export default MenuDrawer;
