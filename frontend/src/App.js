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
        { this.state.sale.map(sale => <li>{sale.revenue}</li>)}
      </ul>
      <div className="chart">
      <Bar
          data={
              labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
              }],  
              }
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
              stacked: false
                }]
                  }
                      }}
      />
      </div>
      </fragment>
    );
  }

}

