import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import { observer } from 'mobx-react';
import { useStore } from '../store';

const Header = observer(() => {
    const [anchorEle, setAnchorEle] = React.useState(null);
    
    const store = useStore();
    const addressError = store.addressError;
    const appBusy = store.checkingAddress || store.retrievingData;

    const handleClose = event => {
        console.log(`Clicked ${event.target.id}`)
        setAnchorEle(null);
    }

    const handleClick = event => {
        setAnchorEle(event.currentTarget);
    }

    const handleChange = event => {
        store.setAddressInput(event.target.value);
    }

    const handleReset = () => {
        store.setAddressInput();
        store.gMap.data.forEach((f)=>store.gMap.data.remove(f))
    }

    return (
        <>
        <AppBar position="static" color='primary'>
            <Toolbar>
                <IconButton edge='start' onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                {store.addressResolved && <Typography>
                    {store.addressRegion}
                    </Typography>}
                {!store.addressResolved && <TextField 
                    value={store.addressInput} 
                    onChange={handleChange} 
                    placeholder='Enter street address'
                    fullWidth
                    disabled={appBusy}
                    error={addressError}
                    helperText={addressError ? 'Could not locate address' : ''} 
                    variant='outlined'
                    size='small'/>}
                {/* Conditionally have editable field + search icon or Resolved Result + edit icon */}
                {!store.addressResolved && <IconButton onClick={store.checkAddress} disabled={appBusy}>
                    <SearchIcon />
                </IconButton>}
                {store.addressResolved && <IconButton onClick={handleReset} disabled={appBusy}>
                    <EditIcon />
                </IconButton>}
                <Menu
                    anchorEl={anchorEle}
                    keepMounted
                    open={Boolean(anchorEle)}>
                    <MenuItem onClick={handleClose} id="menuAbout">
                        Home
                    </MenuItem>
                    {store.polygonLoaded && <MenuItem onClick={handleClose} id="menuMap">
                        View District
                    </MenuItem>}
                    {store.senatorsLoaded && <MenuItem onClick={handleClose} id="menuSenators">
                        Senators
                    </MenuItem>}
                    {store.repsLoaded && <MenuItem onClick={handleClose} id="menuReps">
                        Reps
                    </MenuItem>}
                    <MenuItem onClick={handleClose} id="menuDonate">
                        Donate
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
        </>
    );
});

export default Header;

