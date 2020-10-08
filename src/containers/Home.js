import React from 'react'
import { Box, Typography, Hidden } from '@material-ui/core';
// import { useStore } from '../store';
// import indices from '../misc/cookIndices';

// const Home = () => {
//     const store = useStore();

//     if (!store.district) {
//         return (
//             <>
//                 {!store.district && 'No District Loaded'}
//             </>
//         )
//     }

//     const index = indices.find(i=>i["Dist"] === `${store.state}-${store.district}`)
//     const clinton = +index["Clinton %"];
//     const trump = +index["Trump %"];
//     const sixteen = 100 - clinton - trump;
//     const obama = +index["Obama %"];
//     const romney = +index["Romney %"];
//     const twelve = 100 - obama - romney;

//         var data1 = window.google.visualization.arrayToDataTable([
//             ['Vote', '% this District'],
//             ['Hillary Clinton',     clinton],
//             ['Donald Trump', trump],
//             ['Other', sixteen]
//           ]);
  
//           var options1 = {
//             title: '2016 General Voting'
//           };
//         var data2 = window.google.visualization.arrayToDataTable([
//             ['Vote', '% this District'],
//             ['Barack Obama',     obama],
//             ['Mitt Romney', romney],
//             ['Other', twelve]
//           ]);
  
//           var options2 = {
//             title: '2012 General Voting'
//           };
  
//           var chart = new window.google.visualization.PieChart(document.getElementById('sixteen-chart'));
//           var chart2 = new window.google.visualization.PieChart(document.getElementById('twelve-chart'));

//           chart.draw(data1, options1);
//           chart2.draw(data2, options2);
//     return (
//         <>
//         </>
//     )
// }

export const Home = () => {
  return (
    <>
      <Hidden only={['sm', 'xs']}>
        <Box style={{marginTop: 50, maxWidth: 800}}>
          <Typography variant='h3'>Ready to vote Nov 3rd?</Typography>
          <br />
          <Typography variant='h5'>Your vote for President might be decided, but your Congressional vote(s) are also important</Typography>
          <ul>
            <li>
              <Typography>See what your unique Congressional district looks like (Did you know the US has 435 of them?)</Typography>
            </li>
            <li>
              <Typography>Learn who will be on your personal ballot for the House of Representatives (and for 34 states, the Senate)</Typography>
            </li>
            <li>
              <Typography>Browse Tweets from your candidates to see what issues they're addressing</Typography>
            </li>
            <li>
              <Typography>View financial donor summaries for the candidates</Typography>
            </li>
          </ul>
          <br />
          <Typography variant='h5'>Find out where you can vote</Typography>
          <ul><li>
            <Typography>Find early voting sites, ballot drop-off locations and Election Day polling places near you (as data becomes available)</Typography>
          </li></ul>
        </Box>
        <br />
        <br />
        <Box bgcolor='primary.main' style={{maxWidth: 700, padding: 20}}>
          <Typography variant='h5'>Enter your address above to get started!</Typography>
          <ul><li>
            <Typography>Info on polling places is provided by <a href='https://www.votinginfoproject.org/' rel='noopener noreferrer' target="_blank"> The Voting Info Project</a> If your address doesn't link to any polling place results, check back soon as results will update daily </Typography>
          </li></ul>
        </Box>
      </Hidden>
      <Hidden only={['md', 'lg', 'xl']}>
        <Box style={{marginTop: 20, maxWidth: 500}}>
          <Typography variant='h5'>Ready to vote Nov 3rd?</Typography>
          <br />
          <Typography variant='h6'>Your vote for President might be decided, but your Congressional vote(s) are also important</Typography>
          <ul>
            <li>
              <Typography>See what your unique Congressional district looks like</Typography>
            </li>
            <li>
              <Typography>Learn who will be on your personal ballot for the House (and for 34 states this election, the Senate)</Typography>
            </li>
            <li>
              <Typography>Browse Tweets from your candidates</Typography>
            </li>
            <li>
              <Typography>View financial summaries for your Congressional candidates</Typography>
            </li>
          </ul>
          <Box bgcolor='primary.main' style={{maxWidth: 700, padding: 5}}>
            <Typography variant='body1'>Enter an address above to get started</Typography>
          </Box>
          <br />
          <Typography variant='h5'>Find out where you can vote</Typography>
          <ul><li>
            <Typography>Find early voting sites, ballot drop-off locations and Election Day polling places near you (as data becomes available)</Typography>
          </li></ul>
        </Box>
        <Box bgcolor='primary.main' style={{maxWidth: 500, padding: 5}}>
          <ul><li>
            <Typography variant='body2'>Info on polling places is provided by <a href='https://www.votinginfoproject.org/' rel='noopener noreferrer' target="_blank"> The Voting Info Project.</a> If your address doesn't link to any polling place results, check back soon as results will update daily </Typography>
          </li></ul>
        </Box>
      </Hidden>
    </>
  )
}


export default Home;
