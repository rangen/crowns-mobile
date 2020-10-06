import React from 'react'
import { TwitterTweetEmbed as Embed } from 'react-twitter-embed';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
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

    return (
        <>
            <div>
                <InputLabel id='tweet-month-label'>Show tweets (and retweets) from:</InputLabel>
                <Select labelId='tweet-month-label' style={{minWidth: 275}} value={store.tweetMonthCode} onChange={handleSelect} >
                    {Array.from(store.selectedPolitician.tweetMonths).map(month=><MenuItem value={month}>{decodeMonth(month)}</MenuItem>)}
                </Select>
            </div>
            {store.tweetsToDisplay.map(t=><Embed options={{'align': 'center'}} tweetId={t.snowflake_id}/>)}
        </>
    )
});

export default Tweets
