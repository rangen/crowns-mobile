import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import api from '../services';
import { observer } from 'mobx-react';
import { useStore } from '../store';

const Header = observer(() => {
    const [anchorEle, setAnchorEle] = React.useState(null);
    const [addressInput, setAddressInput] = React.useState('2502 buffalo pass austin texas');
    const store = useStore();
    const addressError = store.addressInfo.error;

    const handleClose = event => {
        console.log(`Clicked ${event.target.id}`)
        setAnchorEle(null);
    }

    const handleClick = event => {
        setAnchorEle(event.currentTarget);
    }

    const handleChange = event => {
        setAddressInput(event.target.value);
    }

    const searchByAddress = async () => {
        let result = await api.checkAddress(addressInput);
        store.processAddressLookup(result);
    }

    return (
        <>
        <AppBar position="static" color='primary'>
            <Toolbar>
                <IconButton edge='start' onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <TextField 
                    value={addressInput} 
                    onChange={handleChange} 
                    placeholder='Enter street address'
                    fullWidth
                    error={addressError}
                    helperText={addressError ? 'Could not locate address' : ''} 
                    variant='outlined'/>
                <IconButton>
                    <SearchIcon onClick={searchByAddress} />
                </IconButton>
                <Menu
                    anchorEl={anchorEle}
                    keepMounted
                    open={Boolean(anchorEle)}>
                    <MenuItem onClick={handleClose} id="menuAbout">
                        About
                    </MenuItem>
                    <MenuItem onClick={handleClose} id="menuSenators">
                        Senators
                    </MenuItem>
                    <MenuItem onClick={handleClose} id="menuReps">
                        Reps
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
        </>
    );
});

export default Header;

