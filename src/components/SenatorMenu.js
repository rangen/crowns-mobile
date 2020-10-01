import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { EmojiPeople } from '@material-ui/icons';
import { useStore } from '../store';
import MenuSelection from './MenuSelection';

const SenatorMenu = () => {
    const store = useStore();

    return (
        <>
            <ListItem key='reps'>
                <ListItemIcon>
                    <EmojiPeople/>
                </ListItemIcon>
                <ListItemText primary='Senators'/>
            </ListItem>
            {store.senators.map(r=><MenuSelection text={r.candidate_name} />)}
        </>
    )
}

export default SenatorMenu;