import React from 'react'
import { Typography, Hidden, Box, Grid } from '@material-ui/core';
import creator from '../misc/creator.png';
import crowns from '../misc/crowns.jpeg';
import libraries from '../misc/libraries.png';

const About = () => {
    return (
        <>
            <Hidden only={['sm', 'xs']}>
                <Box style={{marginTop: 30, maxWidth: 800}}>
                    <Box bgcolor='primary.main' style={{maxWidth: 700, padding: 5}}>
                        <Typography variant='body1'>I'm currently looking to join the right software development team in the Austin area  <a href='mailto:don@pileofcrowns.org' target="_blank" rel="noreferrer noopener">Contact Me!</a></Typography>
                    </Box>
                    <br />
                    <Grid container justify='space-between' direction='row' alignItems='center'>
                        <Grid item xs={3}>
                            <img style={{height: 275, width: 'auto'}} alt='' src={crowns}/>
                        </Grid>
                        <Grid item xs={8}>
                        <Typography variant='h5'>Mission - Why? </Typography>
                        <ul>
                            <li>
                                <Typography>Congressional incumbency rates are normally over 90%</Typography>
                            </li>
                            <li>
                                <Typography>Despite this, Congressional approval rates have been <b>below 40% for the last decade</b></Typography>
                            </li>
                            <li>
                                <Typography>Gerrymandering and redistricting can be confusing and just visualizing your district is difficult</Typography>
                            </li>
                            <li>
                                <Typography>The primary process is confusing, and Congressional votes can unfortunately sometimes be an afterthought</Typography>
                            </li>
                            <li>
                                <Typography>The amount of data available in 2020 and beyond is staggering; Correlating it in meaningful ways empowers citizens</Typography>
                            </li>

                        </ul>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container justify='space-between' direction='row' alignItems='center'>
                        <Grid item xs={8}>
                            <Typography variant='h5'>About the Creator</Typography>
                            <br />
                            <Typography variant='body1'>
                                After a long, successful career in the restaurant industry, I've returned to one of my first loves, software development. It's been so thrilling to witness the explosion of data availability, the huge reach of social media and the ubiquity of Internet access.
                            </Typography>
                            <br />    
                            <Typography>
                                I was raised by parents who taught me to stay out of politics, and as I developed my beliefs in the last 15 years, I've always noticed how difficult it is to find unbiased, personalized information.  I've lived in many parts of the US, and it's common to hear frustration at "not knowing what to believe."
                            </Typography>
                            <br />
                            <Typography>
                                After some of the shocking events in early 2020, specifically the misinformation about COVID-19 and the stunning silence of many leaders surrounding the murder of George Floyd, I set out to incorporate social media (Twitter) into an app in a meaningful way.  While Twitter posts are far from a guarantee of policy change, they are still a very meaningful way to get new generations engaged in the political process.  And for every new citizen that becomes engaged, the more American democracy can work as intended.
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <img style={{height: 325, width: 'auto'}} alt='' src={creator}/>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container justify='space-between' direction='row' alignItems='center'>
                        <Grid item xs={5}>
                            <img style={{height: 200, width: 'auto'}} alt='' src={libraries}/>
                        </Grid>
                        <Grid item xs={6}>
                <Typography variant='h5'>Technical - This site has been developed using </Typography>
                    <ul>
                        <li>
                            <Typography>React 16.13</Typography>
                        </li>
                        <li>
                            <Typography>MobX</Typography>
                        </li>
                        <li>
                            <Typography>AWS (Lambda + EventBridge + RDS + S3)</Typography>
                        </li>
                        <li>
                            <Typography>Postgres</Typography>
                        </li>
                        <li>
                            <Typography>Google Civic API</Typography>
                        </li>
                        <li>
                            <Typography>Material UI</Typography>
                        </li>
                        <li>
                            <Typography>Node.js</Typography>
                        </li>
                    </ul>
                    </Grid>
                    </Grid>
                </Box> 
            </Hidden>
            <Hidden only={['md', 'lg', 'xl']}>
                <Box style={{marginTop: 10, maxWidth: 800}}>
                    <Box bgcolor='primary.main' style={{maxWidth: 400, padding: 5}}>
                        <Typography variant='body1'>I'm currently looking to join the right software development team in Austin <a href='mailto:don@pileofcrowns.org' target="_blank" rel="noreferrer noopener">Contact Me!</a></Typography>
                    </Box>
                    <br />
                    <Grid container justify='space-between' direction='row' alignItems='center'>
                        <Grid item xs={3}>
                            <img style={{height: 80, width: 'auto'}} alt='' src={crowns}/>
                        </Grid>
                        <Grid item xs={8}>
                        <Typography variant='h5'>Mission - Why? </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <ul>
                            <li>
                                <Typography>Congressional incumbency rates are normally over 90%</Typography>
                            </li>
                            <li>
                                <Typography>Despite this, Congressional approval rates have been <b>below 40% for the last decade</b></Typography>
                            </li>
                            <li>
                                <Typography>Gerrymandering and redistricting can be confusing and just visualizing your district is difficult</Typography>
                            </li>
                            <li>
                                <Typography>The primary process is confusing, and Congressional votes can unfortunately sometimes be an afterthought</Typography>
                            </li>
                            <li>
                                <Typography>The amount of data available in 2020 and beyond is staggering; Correlating it in meaningful ways empowers citizens</Typography>
                            </li>

                        </ul>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container justify='space-between' direction='row' alignItems='center'>
                        <Typography variant='h5'>About the Creator</Typography>
                        <Grid item xs={12}>
                            <br />
                            <Typography variant='body1'>
                                After a long, successful career in the restaurant industry, I've returned to one of my first loves, software development. It's been so thrilling to witness the explosion of data availability, the huge reach of social media and the ubiquity of Internet access.
                            </Typography>
                            <br />    
                            <Typography>
                                I was raised by parents who taught me to stay out of politics, and as I developed my beliefs in the last 15 years, I've always noticed how difficult it is to find unbiased, personalized information.  I've lived in many parts of the US, and it's common to hear frustration at "not knowing what to believe."
                            </Typography>
                            <br />
                            <Typography>
                                After some of the shocking events in early 2020, specifically the misinformation about COVID-19 and the stunning silence of many leaders surrounding the murder of George Floyd, I set out to incorporate social media (Twitter) into an app in a meaningful way.  While Twitter posts are far from a guarantee of policy change, they are still a very meaningful way to get new generations engaged in the political process.  And for every new citizen that becomes engaged, the more American democracy can work as intended.
                            </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container justify='space-between' direction='row' alignItems='center'>
                        <Grid item xs={12}>
                            <img style={{height: 200, width: 'auto'}} alt='' src={libraries}/>
                        </Grid>
                    </Grid>
                </Box> 
            </Hidden>
        </> 
    )
}

export default About
