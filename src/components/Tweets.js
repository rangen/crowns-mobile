import React from 'react'
import { TwitterTweetEmbed as Embed } from 'react-twitter-embed';
import { Select, MenuItem, FormHelperText, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Pagination } from '@material-ui/lab';
import { observer } from 'mobx-react';
import { useStore } from '../store';

const Tweets = observer(() => {
    const store = useStore();
    
    const decodeMonth = val => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let [month, year] = val.split('-');
        return `${months[month]} ${year}`
    }

    const handleSelect = event => {
        store.tweetMonthCode = event.target.value;
    }
    console.log('rendering tweet container');
    return (
        <>
            <div style={{display: 'flex'}}>
                <div>
                
                    <FormHelperText>Show tweets (and retweets) from:</FormHelperText>
                    <Select helperText={'Show tweets (and retweets) from:'} labelId='tweet-month-label' style={{minWidth: 225}} value={store.tweetMonthCode} onChange={handleSelect} >
                        {Array.from(store.selectedPolitician.tweetMonths).map(month=><MenuItem value={month}>{decodeMonth(month)}</MenuItem>)}
                    </Select>
                </div>
                <div>
                    <FormHelperText>Page:</FormHelperText>
                    <Pagination onChange={(e, v)=>store.changeTweetPageIndex(v-1)} count={Math.ceil(store.tweetsForSelectedMonth.length / 10)} />
                </div>
            </div>
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
