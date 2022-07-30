import React from 'react';
import {
  Chart,
  BarController,
  LinearScale,
  CategoryScale,
  BarElement
} from 'chart.js';
import { faceit } from './ranks';

export default class FaceitChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    Chart.register(
      BarController,
      LinearScale,
      CategoryScale,
      BarElement
    );

    const data = {
      labels: faceit,
      datasets: [{
        data: [12, 45, 23, 39, 12, 45, 23, 39, 12, 45, 23, 39, 12, 45, 23, 39, 12, 45],
        backgroundColor: [
          '#A79BA0',
          'rgba(255, 159, 64)',
          'rgba(255, 205, 86)',
          'rgba(75, 192, 192)'
        ],
        borderColor: [
          'rgba(25, 99, 12)',
          'rgba(255, 159, 64)',
          'rgba(255, 205, 86)',
          'rgba(75, 192, 192)'
        ],
        borderWidth: 1
      }]
    };
    const config = {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y'
      }
    };
    const myChart = new Chart(this.chartRef.current, config);
    myChart.render();
  }

  render() {
    return (
      <canvas ref={this.chartRef}></canvas>
    );
  }
}
