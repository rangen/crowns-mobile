import React from 'react'
import { Snackbar, SnackbarContent, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStore } from '../store';
import { observer } from 'mobx-react';

const Toast = observer(() => {
    const store = useStore();

    const handleClose = (event, reason) => {
        store.menuToastOpen = false;
    }

    return (
        <>
            <Hidden only={['md', 'lg', 'xl']}>
                {store.menuToastOpen && 
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        open={true}
                        autoHideDuration={4500}
                        onClose={handleClose}
                >
                    <SnackbarContent
                        style={{backgroundColor: '#e0f7fa', color: '#121858'}}
                        message={
                        <>
                            <span style={{verticalAlign: 'middle'}}>Address found! View candidates using <MenuIcon/> button</span>
                        </>
                        }
                    />
                    </Snackbar>
                }
            </Hidden>
        </>
    )
});

export default Toast;
