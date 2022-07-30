import React from 'react';
// import AppContext from '../lib/app-context';
import MmChart from '../components/mm-chart';
import FaceitChart from '../components/faecit-chart';

export default class PlayerGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRegion: 'NA West',
      buttons: true
    };
    this.handleMmButton = this.handleMmButton.bind(this);
    this.handleFaceitButton = this.handleFaceitButton.bind(this);
  }

  handleMmButton(event) {
    this.setState({ buttons: true });
  }

  handleFaceitButton(event) {
    this.setState({ buttons: false });
  }

  render() {
    return (
          <div className='row-1'>
            <div className='col-whole'>
              <div className='row-fifth'>
                <h1 className='region'>{this.state.currentRegion}</h1>
                <h1>Player Rank Spread</h1>
                <form action="stat" className='just-cent'>
                  <button onClick={this.handleMmButton} type='button' className={`btn graph-mm-${this.state.buttons ? 'on' : 'off'}`}>Matchmaking</button>
                  <button onClick={this.handleFaceitButton} type='button' className={`btn graph-faceit-${this.state.buttons ? 'off' : 'on'}`}>Faceit</button>
                </form>
              </div>
              <div className='row-three-fifth'>
                  {this.state.buttons ? <MmChart /> : <FaceitChart />}
              </div>
              <div className='row-fifth'>
                  <ul className='dropdown-menu'>
                    <li><a className="dropdown-item" href="#">NA West</a></li>
                    <li><a className="dropdown-item" href="#">NA East</a></li>
                    <li><a className="dropdown-item" href="#">SA West</a></li>
                    <li><a className="dropdown-item" href="#">SA East</a></li>
                    <li><a className="dropdown-item" href="#">EU East</a></li>
                    <li><a className="dropdown-item" href="#">EU Central</a></li>
                    <li><a className="dropdown-item" href="#">EU West</a></li>
                    <li><a className="dropdown-item" href="#">CIS</a></li>
                    <li><a className="dropdown-item" href="#">Middle East</a></li>
                    <li><a className="dropdown-item" href="#">Asia North</a></li>
                    <li><a className="dropdown-item" href="#">Asia South</a></li>
                    <li><a className="dropdown-item" href="#">Ocieana</a></li>
                  </ul>
              </div>
            </div>
          </div>
    );
  }
}
