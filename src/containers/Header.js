import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import Hidden from '@material-ui/core/Hidden';
import { observer } from 'mobx-react';
import { useStore } from '../store';

const Header = observer(() => {    
    const store = useStore();
    const addressError = store.addressError;
    const appBusy = store.checkingAddress || store.retrievingData;

    useEffect(()=> {
        if (store.placesService || !window.google) return;
        store.placesService = new window.google.maps.places.AutocompleteService();
    })

    const handleInput = async (event, value) => {
        if (addressError) store.addressError = false;
        store.addressInput = value;
    }

    const handleReset = () => {
        store.setAddressInput();
    }

    const handleSearch = () => {
        if (!store.addressInput) return;   //no search on null / empty string / select cancel
        store.setPage('map');
        store.checkAddress();
    }

    return (
        <>
        <AppBar position="sticky" color='primary' style={{zIndex: 2000}}>
            <Toolbar>
                <Hidden only={['md', 'lg', 'xl']}>
                    <IconButton edge='start' onClick={()=>store.menuOpen = true}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                {store.addressRegion && <Typography>
                    {store.addressRegion}
                    </Typography>}
                {!store.addressResolved && <Autocomplete 
                        freeSolo
                        onInputChange={handleInput}
                        onChange={handleSearch}
                        value={store.addressInput}
                        style={{width: 500}}
                        renderInput={(params)=><TextField 
                                                    {...params}
                                                    placeholder = 'Enter street adddress'
                                                    error={addressError}
                                                    helperText={addressError ? 'Could not locate address' : ''}
                                                     />}
                        getOptionLabel={option=>option}
                        options={store.autocompleteSuggestions}
                    />
                }
                {/* Conditionally have editable field + search icon or Resolved Result + edit icon */}
                {!store.addressResolved && <IconButton onClick={handleSearch} disabled={appBusy}>
                    <SearchIcon />
                </IconButton>}
                {store.addressResolved && <IconButton onClick={handleReset} disabled={appBusy}>
                    <EditIcon style={{color: '#121858'}} />
                </IconButton>}
                
            </Toolbar>
        </AppBar>
        </>
    );
});

export default Header;

