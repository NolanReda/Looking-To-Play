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
          '#FFFFFF',
          '#1FE101',
          '#1CBF05',
          '#FED603',
          '#FED300',
          '#FDD000',
          '#F8CB01',
          '#FD6E1A',
          '#EF6716',
          '#E72821'
        ],
        borderColor: [
          '#FFFFFF',
          '#1FE101',
          '#1CBF05',
          '#FED603',
          '#FED300',
          '#FDD000',
          '#F8CB01',
          '#FD6E1A',
          '#EF6716',
          '#E72821'
        ],
        borderWidth: 1
      }]
    };
    const config = {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        responsive: true
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
