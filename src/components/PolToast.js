import React from 'react'
import { Snackbar, SnackbarContent, Hidden } from '@material-ui/core';
import { useStore } from '../store';
import { observer } from 'mobx-react';

const PolToast = observer(() => {
    const store = useStore();

    const handleClose = (event, reason) => {
        store.polToastOpen = false;
    }

    return (
        <>
            <Hidden only={['md', 'lg', 'xl']}>
                {store.polToastOpen && 
                    <Snackbar
                        style={{marginBottom: 60}}
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
                        message='View Financial Info or Tweets using tabs below'
                    />
                    </Snackbar>
                }
            </Hidden>
        </>
    )
});

export default PolToast;
