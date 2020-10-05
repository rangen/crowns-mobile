import React from 'react'
import { TwitterTweetEmbed as Embed } from 'react-twitter-embed';
import { useStore } from '../store';

const Tweets = () => {
    const store = useStore();

    return (
        <>
            {store.selectedPolitician.tweets && store.selectedPolitician.tweets.slice(0, 5).map(t=><Embed options={{'align': 'center'}} tweetId={t.snowflake_id}/>)}
        </>
    )
}

export default Tweets
