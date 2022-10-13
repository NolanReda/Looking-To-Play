import React from 'react';
import AppContext from '../lib/app-context';

export default class GetStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStats: null,
      clicked: false,
      steamId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.displayInput = this.displayInput.bind(this);
    this.getStats = this.getStats.bind(this);
    // this.storeStats = this.storeStats.bind(this);
  }

  handleChange(event) {
    this.setState({ steamId: event.target.value });
  }

  displayInput(event) {
    this.setState({ clicked: true });
  }

  getStats() {
    const { steamId } = this.state;
    const req = {
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    };
    fetch(`/api/stats/730/${steamId}`, req)
      .then(res => res.json())
      .then(result => {
        const statArray = [];
        const stats = result.playerstats.stats;
        for (let i = 0; i < stats.length; i++) {
          if (stats[i].name === 'total_kills_headshot' || stats[i].name === 'total_kills' || stats[i].name === 'total_deaths' || stats[i].name === 'total_wins' || stats[i].name === 'total_matches_played') {
            statArray.push(stats[i]);
          }
          if (stats[i].name === 'total_rounds_map_de_dust2' || stats[i].name === 'total_rounds_map_de_inferno' || stats[i].name === 'total_rounds_map_de_nuke' || stats[i].name === 'total_rounds_map_de_vertigo' || stats[i].name === 'total_rounds_map_de_mirage' || stats[i].name === 'total_rounds_map_de_overpass') {
            statArray.push(stats[i]);
          }
          this.setState({ userStats: statArray });
          const req2 = {
            headers: {
              'X-Access-Token': window.localStorage.getItem('react-context-jwt')
            }
          };
          fetch(`/api/users/stats/${this.context.user}/${this.state.userStats}`, req2)
            .then(response => response.json());
        }
      });
    this.setState({ clicked: false });
  }

  // componentDidUpdate() {
  //   if (!this.state.userStats) {
  //     return;
  //   }
  //   // const { userStats } = this.state;
  //   // const { userId } = this.context.user;
  //   // const req = {
  //     headers: {
  //       'X-Access-Token': window.localStorage.getItem('react-context-jwt')
  //     }
  //   };
  //   fetch('/api/users/');
  // }

  render() {
    return (
      <div>
        {
          this.state.hasRanks === false &&
            <div className='d-flex justify-content-center mt-3'>
              <button onClick={this.addRanks} className='c-white btn btn-lg btn-info'>send ranks</button>
            </div>
        }
        {
          this.state.userStats === null &&
          <div className='mt-5 d-flex justify-content-center ml-2'>
            <button onClick={!this.state.clicked ? this.displayInput : this.getStats} className='c-white btn btn-lg btn-info'>{!this.state.clicked ? 'Get stats from Steam account' : 'Get stats now'}</button>
          </div>
        }
        {
          this.state.clicked === true &&
          <div className='mt-5 d-flex justify-content-center ml-2'>
            <label className='steam-id-label' htmlFor="steam-id">
              Steam ID
            </label>
            <input onChange={this.handleChange} type="text" name="steamId" id="steam-id" />
          </div>
        }
        {
          this.state.userStats !== null &&
          <div className='stats-display mt-5 d-flex justify-content-center'>
            <h1>I have the stats!</h1>
          </div>
        }
      </div>
    );
  }
}

GetStats.contextType = AppContext;
