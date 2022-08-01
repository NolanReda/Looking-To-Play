import React from 'react';
import {
  Chart,
  BarController,
  LinearScale,
  CategoryScale,
  BarElement
} from 'chart.js';
import { matchMaking } from './ranks';
import ChartContext from '../lib/chart-context';

Chart.register(
  BarController,
  LinearScale,
  CategoryScale,
  BarElement
);

export default class MmChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: '',
      rankInputs: []
    };
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { currentRegion } = this.context;
    fetch(`api/users/${currentRegion}`)
      .then(res => res.json())
      .then(result => {
        const ranksData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < result.length; i++) {
          if (result[i].rank < 19) {
            ranksData[result[i].rank]++;
          }
        }
        this.setState({ rankInputs: ranksData, region: currentRegion });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.region !== this.context.currentRegion) {
      this.loadData();
      return;
    }
    if (this.state.rankInputs === prevState.rankInputs) {
      return;
    }
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: {
        labels: matchMaking,
        datasets: [{
          data: this.state.rankInputs,
          backgroundColor: [
            '#D8D2D5',
            '#C9C4C6',
            '#B9B1B5',
            '#A4A2A3',
            '#7D7480',
            '#63ABFD',
            '#5DA0EC',
            '#4E88CB',
            '#3A689D',
            '#395A9F',
            '#214DA9',
            '#18346F',
            '#222224',
            '#222224',
            '#222224',
            '#222224',
            '#222224',
            '#222224'
          ],
          borderColor: [
            '#A79BA0',
            '#A79BA0',
            '#A79BA0',
            '#A79BA0',
            '#A79BA0',
            '#A79BA0',
            '#ABAEA7',
            '#ABAEA7',
            '#ABAEA7',
            '#ABAEA7',
            '#E1DA92',
            '#E1DA92',
            '#E1DA92',
            '#E1DA92',
            '#E1DA92',
            '#E1DA92',
            '#E1DA92',
            '#E1DA92'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y'
      }
    });
    this.chart.render();
  }

  render() {
    return (
      <canvas ref={this.chartRef}></canvas>
    );
  }
}

MmChart.contextType = ChartContext;
