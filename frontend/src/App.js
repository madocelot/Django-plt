import React from 'react';
//import axios from 'axios';
import {Bar} from 'react-chartjs-2';

// function workertoDataset(worker){


//   return dataset}


export default class crtList extends React.Component {
  state = {
    data: [],
    years: [],
    dataset : [],
  }


// formatting JSON and splitting into 2 into 2 arrays 
  createTable = (x) => {
    let q = x;
    let years = [];
    let table = {};
    let dataset = []
    
    for (let n in q)
    {
      //console.log('WWWWW', q[n].worker)
      table[q[n].worker] = []
    };
    for (let i in q){
      
      //console.log('o', q[i])
      //console.log('year', q[i].year)
      if (!(years.includes(q[i].year)))
      {
        years.push(q[i].year)
      }
      //console.log('worker', q[i].worker)
      //console.log('rev', q[i].revenue)
      
      
      table[q[i].worker].push(q[i].revenue)
      
           }
    //console.log('years', years)
    //console.log('table', table)
    for (let a in table)
      {

        //console.log('a', a, 'value', table[a]);
        let r = [Math.random()*255,Math.random()*255,Math.random()*255]
        let s = [Math.random()*255,Math.random()*255,Math.random()*255]
        dataset.push(
          {
            label: a,
            backgroundColor: 'rgba('+r.toString()+',0.2)',
            borderColor: 'rgba('+r.toString()+',1)',
            borderWidth: 1,          
            hoverBackgroundColor: 'rgba('+s.toString()+',0.4)',
            hoverBorderColor: 'rgba('+s.toString()+',1)',   
            data: table[a]
          },
        )
      }
  
    //console.log('FOR dataset', dataset)
    return this.setState({years: years, dataset : dataset})
   }

   //getting data from JSON first thing in the morning
   componentWillMount() {
		fetch('http://localhost:8000/api/crt/?format=json')
      .then(response => response.json())
			.then(data => {
        this.setState({data: data })
        // console.log(this.state.data);
        // console.log('0:', this.state.data[0]);
        // console.log('object:', typeof(this.state.data[0]));
        // console.log(typeof(this.state.data) === undefined);
        // console.log(this.state.data[0].year);
        this.createTable(this.state.data);
		})
			.catch(err => console.error(this.props.url, err.toString()))
  }
  
  

  // componentDidMount() {
  //   axios.get(`http://localhost:8000/api/crt/?format=json`)
  //     .then(res => {
  //       const sale = res.data;
  //       this.setState({ data });
  //     })
  // }
      //   { <ul>
      //   { this.state.sale.map(sale => <ul>{sale.worker}</ul>)}
      // </ul> ,
  
//rendering the bar
  render() {
    return (
      <div> 
      <Bar
          data= {
            {
              labels: this.state.years,
              datasets : Object.values(this.state.dataset),
            }
          }
            width={300}
            height= {150}
            options={{
                tooltips: {
                  mode: 'point',
                  intersect: false,
                          },
          responsive: true,
          scales: {
            xAxes: [{
            stacked: true,
                  }],
            yAxes: [{
              ticks: {
                  beginAtZero: true
                    },
              stacked: true
                }]
                  }
                      }}
      />
      </div>
      
    );
  }

//   render() {
//     return (
//       <div>
//         <h2>Bar Example (custom size)</h2>
//         <Bar
//           data={data}
//           width={100}
//           height={50}
//           options={{
//             maintainAspectRatio: false
//           }}
//         />
//       </div>
//     );
// }

}
//hardcoded data used for testing
// const data = {
//   labels: ['2015','2016'],
//   datasets: [
//     {
//       label: 'Hideo',
//       backgroundColor: 'rgba(255,99,132,0.2)',
      
//       borderWidth: 1,
      
//       data: [205, null, 423]
//     },
//     {
//       label: 'Kojima',
//       backgroundColor: 'rgba(180,200,132,0.2)',
      
//       borderWidth: 1,
//       data: [200,441, 235]
//     },
//     {
//       label: 'Fukusima',
//       backgroundColor: 'rgba(180,80,132,0.2)',
      
//       borderWidth: 1,
//       data: [223,256, 312]
//     }
//   ]
// };



