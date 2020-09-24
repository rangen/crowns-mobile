import React from 'react';
import { useStore } from '../store';
import { observer } from 'mobx-react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MenuSelection = observer(({ key, icon, text, value }) => {
    const store = useStore();

    return (
        <ListItem key={key} button onClick={()=>store.setPage(value)}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text}/>
        </ListItem>
    );
});

export default MenuSelection;