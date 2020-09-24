import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../store';
import { observer } from 'mobx-react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MenuSelection = observer(({ key, icon, text, value }) => {
    const store = useStore();
    const obj = useHistory();

    const handleClick = () => {
        store.setPage(value);
        obj.push(`/${value}`);
    }

    return (
        <ListItem key={key} button onClick={handleClick}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text}/>
        </ListItem>
    );
});

export default MenuSelection;