import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { EmojiPeople } from '@material-ui/icons';
import StarIcon from '@material-ui/icons/Star';
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
            {store.reps.map(r=><MenuSelection text={r.candidate_name} keyName={`r${r.id}`} value='politician' secIcon={r.incumbent === 'I' ? <StarIcon style={{color: '#ffc107'}}/> : null} politician={{isSenator:  false, id:  r.id}}/>)}
        </>
    )
}

export default RepMenu;
