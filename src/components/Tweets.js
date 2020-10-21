import React, { useState } from 'react'
import { TwitterTweetEmbed as Embed } from 'react-twitter-embed';
import { Select, MenuItem, FormHelperText, Box, Grid, Tooltip, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Pagination } from '@material-ui/lab';
import { observer } from 'mobx-react';
import { useStore } from '../store';

const Tweets = observer(() => {
    const store = useStore();
    
    const [tooltipOpen, setTooltipOpen] = useState(true);
    setTimeout(()=>setTooltipOpen(false), 3500);

    const tooltipOrientation = useMediaQuery('(min-width:600px)') ? 'bottom' : 'right'

    const decodeMonth = val => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let [month, year] = val.split('-');
        return `${months[month]} ${year}`
    }

    const handlePageChange = (event, value) => {
        if (value === store.tweetPageIndex) return; 
        store.changeTweetPageIndex(value-1)
    }

    const handleSelect = event => {
        store.changeTweetPageIndex(0);
        store.tweetMonthCode = event.target.value;
    }
    console.log('rendering tweet container');
    return (
        <>
            <Grid container style={{display: 'flex', marginBottom: 25}}>
                <Grid item s={12}>
                    <FormHelperText>Show tweets (and retweets) from:</FormHelperText>
                    <Tooltip
                        title={`View Tweets back to ${decodeMonth(store.selectedPolitician.oldestMonth)}`}
                        open={tooltipOpen}
                        placement={tooltipOrientation}
                        arrow
                    >
                        <Select helperText={'Show tweets (and retweets) from:'} labelId='tweet-month-label' style={{minWidth: 225}} value={store.tweetMonthCode} onChange={handleSelect} >
                            {Array.from(store.selectedPolitician.tweetMonths).map(month=><MenuItem value={month}>{decodeMonth(month)}</MenuItem>)}
                        </Select>
                    </Tooltip>
                </Grid>
                <Grid item s={12}>
                    <FormHelperText>Page:</FormHelperText>
                    <Pagination onChange={handlePageChange} page={store.tweetPageIndex + 1} count={Math.ceil(store.tweetsForSelectedMonth.length / 10)} />
                </Grid>
            </Grid>
            {store.tweetsToDisplay.map(t=>
                <Embed 
                    key={t.snowflake_id} 
                    options={{'align': 'center'}} 
                    tweetId={t.snowflake_id}
                    placeholder={
                        <Box 
                            display='flex' 
                            alignItems='center' 
                            justifyContent='center'>
                            <Skeleton variant='rect' width={550} height={350} />
                        </Box>} 
                />)
            }
        </>
    )
});

export default Tweets
