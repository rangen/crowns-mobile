import React from 'react'
import { Snackbar, SnackbarContent, Hidden } from '@material-ui/core';
import { useStore } from '../store';
import { observer } from 'mobx-react';

const Toast = observer(() => {
    const store = useStore();

    const handleClose = (event, reason) => {
        store.toastOpen = false;
    }

    return (
        <>
            <Hidden only={['md', 'lg', 'xl']}>
                {store.toastOpen && 
                    <Snackbar
                    style={{backgroundColor: '#808080'}}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    open={true}
                    autoHideDuration={3500}
                    onClose={handleClose}
                >
                    <SnackbarContent
                        style={{backgroundColor: '#e0f7fa', color: '#121858'}}
                        message='Address found! Swipe from left side to open menu'
                    />
                    </Snackbar>
                }
            </Hidden>
        </>
    )
});

export default Toast;
