import React from 'react';
import { Box, Button, Typography, Grid } from '@material-ui/core';

const Donate = () => {
    return (    
        <>
            <Box style={{marginTop: 40}}>
                <Typography variant='body1'>Thanks for using this free tool to learn more about your Congressional District and candidates in the upcoming election.  Donations are graciously accepted and help with maintaining website availability, speed and future features.</Typography>
            </Box>
            <Box style={{marginTop: 40, maxWidth: 300}} border={1} padding={5}>
                <Grid container justify='center' alignItems='center' spacing={2}>
                    <Grid item >
                    <Button size='large' variant='contained' color='#e0f7fa' onClick={()=>window.open('https://paypal.me/PileOfCrowns', '_blank')}>Paypal</Button>
                        </Grid>
                    <Grid item>
                        <Button size='large' variant='contained' color='#e0f7fa' onClick={()=>window.open('https://venmo.com/PileOfCrowns', '_blank')}>Venmo</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
        )
    // return (    
    //     <>
    //         <Box style={{marginTop: 40}}>
    //             <Typography variant='body1'>Thanks for using this free tool to learn more about your Congressional District and candidates in the upcoming election.  Donations are graciously accepted and help with maintaining website availability, speed and future features.</Typography>
    //         </Box>
    //         <Box style={{marginTop: 80}}>
    //             <Button variant='contained' size='large' startIcon={<img alt='' src={paypal}/>} onClick={()=>window.open('https://paypal.me/PileOfCrowns', '_blank')}>Paypal</Button>
    //             <br/>
    //             <br/>
    //             <br/>
    //             <Button variant='contained' size='large' color='#6f74dd' startIcon={<img alt='' src={venmo}/>} onClick={()=>window.open('https://venmo.com/PileOfCrowns', '_blank')}>Venmo</Button>
    //         </Box>
    //     </>
    //     )
}

export default Donate;
   