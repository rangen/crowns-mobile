import React from 'react'
import { useStore } from '../store';
import indices from '../misc/cookIndices';

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
      <p>Ready to cast your vote November 3rd?</p>
      <p>Stay informed regarding an equally important part of the democratic process: electing your Congressional representatives</p>
      <p>To get started, enter your address above and:</p>
      <ul>
        <li>See what your unique Congressional district looks like (Did you know the US has 435 of them?)</li>
        <li>Learn who will be on your personal ballot for the House of Representatives (and for 34 states, the Senate)</li>
        <li>Browse Tweets from your candidates to see what issues they're addressing</li>
        <li>View financial donor summaries for the candidates</li>
        <li>Find early voting sites, ballot drop-off locations and Election Day polling places near you (as data becomes available)</li>

      </ul>
    </>
  )
}


export default Home;
