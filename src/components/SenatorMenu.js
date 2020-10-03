import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import { EmojiPeople } from '@material-ui/icons';
import StarIcon from '@material-ui/icons/Star';
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
            {store.senators.map(s=><MenuSelection text={s.candidate_name} keyName={`s${s.id}`} value='politician' secIcon={s.incumbent === 'I' ? <Tooltip title='Incumbent'><StarIcon style={{color: '#ffc107'}}/></Tooltip> : null} politician={{isSenator:  true, id:  s.id}}/>)}
        </>
    )
}

export default SenatorMenu;