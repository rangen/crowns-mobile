import React from 'react';
import { useStore } from '../store';
import { observer } from 'mobx-react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MenuSelection = observer(({ keyName, icon, secIcon, text, value, politician }) => {
    const store = useStore();

    const handleClick = () => {
        if (politician) {
            store.selectedPolitician = politician.isSenator ? store.senators.find(s=>s.id === politician.id) : store.reps.find(r=>r.id === politician.id);
        };
        store.setPage(value);
    }

    return (
        <ListItem key={keyName} button onClick={handleClick}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text}/>
            <ListItemIcon>
                {secIcon}
            </ListItemIcon>
        </ListItem>
    );
});

export default MenuSelection;