import React from 'react';
import AppContext from '../lib/app-context';
import MmChart from '../components/mm-chart';
import FaceitChart from '../components/faecit-chart';
import ChartContext from '../lib/chart-context';
import Redirect from '../components/redirect';

export default class PlayerGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRegion: 'NA West',
      buttons: true
    };
    this.handleMmButton = this.handleMmButton.bind(this);
    this.handleFaceitButton = this.handleFaceitButton.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleMmButton(event) {
    this.setState({ buttons: true });
  }

  handleFaceitButton(event) {
    this.setState({ buttons: false });
  }

  handleSelect(event) {
    this.setState({ currentRegion: event.target.value });
  }

  render() {
    const { currentRegion } = this.state;
    const chartValue = { currentRegion };
    if (!this.context.user) return <Redirect to='sign-in' />;
    return (
        <ChartContext.Provider value={chartValue}>
          <div className='row-1'>
            <div className='col-whole'>
              <div className='row-fifth'>
                <h1 className='region'>{this.state.currentRegion}</h1>
                <h1>Player Rank Spread</h1>
                <form action="stat" className=' chart-form just-cent'>
                  <button onClick={this.handleMmButton} type='button' className={`btn graph-mm-${this.state.buttons ? 'on' : 'off'}`}>Matchmaking</button>
                  <button onClick={this.handleFaceitButton} type='button' className={`btn graph-faceit-${this.state.buttons ? 'off' : 'on'}`}>Faceit</button>
                </form>
              </div>
              <div className='row-three-fifth'>
                  {this.state.buttons ? <MmChart /> : <FaceitChart />}
              </div>
              <div className='row-fifth'>
                <select className='dropdown' value={this.state.currentRegion} onChange={this.handleSelect}>
                  <option value="NA West">NA West</option>
                  <option value="NA East">NA East</option>
                  <option value="SA West">SA West</option>
                  <option value="SA East">SA East</option>
                  <option value="EU West">EU West</option>
                  <option value="EU Central">EU Central</option>
                  <option value="EU East">EU East</option>
                  <option value="CIS">CIS</option>
                  <option value="Middle East">Middle East</option>
                  <option value="Asia North">Asia North</option>
                  <option value="Asia South">Asia South</option>
                  <option value="Ocieana">Ocieana</option>
                </select>
              </div>
            </div>
          </div>
      </ChartContext.Provider>
    );
  }
}

PlayerGraph.contextType = AppContext;
