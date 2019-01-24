import React from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

export default class crtList extends React.Component {
  state = {
    sale: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/crt/?format=json`)
      .then(res => {
        const sale = res.data;
        this.setState({ sale });
      })
  }
  
/* {this.state.sale} */
  render() {
    return (
      <fragment>
      <ul>
        { this.state.sale.map(sale => <ul>{sale.worker}</ul>)}
      </ul>
      <div className="chart">
      <Bar
          data= {data}
            width={400}
            height='150'
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
      </fragment>
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
const data = {
  labels: ['2015', '2016'],
  datasets: [
    {
      label: 'Hideo',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [205,341]
    },
    {
      label: 'Kojima',
      backgroundColor: 'rgba(180,200,132,0.2)',
      borderColor: 'rgba(180,200,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(180,200,132,0.4)',
      hoverBorderColor: 'rgba(180,200,132,1)',
      data: [200,441]
    },
    {
      label: 'Fukusima',
      backgroundColor: 'rgba(180,80,132,0.2)',
      borderColor: 'rgba(180,80,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(180,80,132,0.4)',
      hoverBorderColor: 'rgba(180,80,132,1)',
      data: [223,256]
    }
  ]
};

const getData = () => {
  try {
    return axios.get('http://localhost:8000/api/crt/?format=json')
  } catch (error) {
    console.error(error)
  }
};


