import React from 'react';
import {
  Chart,
  BarController,
  LinearScale,
  CategoryScale,
  BarElement
} from 'chart.js';
import { faceit } from './ranks';
import ChartContext from '../lib/chart-context';

Chart.register(
  BarController,
  LinearScale,
  CategoryScale,
  BarElement
);

export default class FaceitChart extends React.Component {
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
        const ranksData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < result.length; i++) {
          if (result[i].rank < 29) {
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
        labels: faceit,
        datasets: [{
          data: this.state.rankInputs,
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

FaceitChart.contextType = ChartContext;
