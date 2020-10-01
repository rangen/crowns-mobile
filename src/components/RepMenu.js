import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { EmojiPeople } from '@material-ui/icons';
import { useStore } from '../store';
import MenuSelection from './MenuSelection';

const RepMenu = () => {
    const store = useStore();

    return (
        <>
            <ListItem key='reps'>
                <ListItemIcon>
                    <EmojiPeople/>
                </ListItemIcon>
                <ListItemText primary='Representatives'/>
            </ListItem>
            {store.reps.map(r=><MenuSelection text={r.candidate_name} />)}
        </>
    )
}

export default RepMenu;
