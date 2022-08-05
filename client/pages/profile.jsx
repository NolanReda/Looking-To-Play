import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStats: null,
      clicked: false,
      steamId: ''
    };
    this.displayInput = this.displayInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ steamId: event.target.value });
  }

  displayInput(event) {
    this.setState({ clicked: true });
  }

  getStats() {
    fetch(
      'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=E2D3379379D74F48FE181E7411AC6704&steamid=76561198077457151'
      // {
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': null
      //   }
      // }
    );
    // .then(res => {
    // console.log(res);
    // res.json();
    // })
    // .then(result => console.log(result));
  }

  render() {

    const { user } = this.context;

    if (!this.context.user) return <Redirect to='sign-in' />;

    return (
      <div className='container-prof'>
        <div className='mt-5'>
          <h1 className='ml-8'>{user.username}</h1>
          <img className='prof-photo' src="images/default.jpg" alt="" />
          <div className='d-flex align-items-center mt-4'>
            <h4 className='c-white '>Matchmaking Rank</h4>
            <img className='rank-badge ms-3' src="images/gold/gold-3.png" alt="" />
          </div>
          <div className='d-flex align-items-center mt-4'>
            <h3 className='c-white'>Faceit Rank</h3>
            <img className='fa-rank ml-8' src="images/faceit/4.png" alt="" />
          </div>
          { this.state.userStats === null &&
            <div className='mt-5 d-flex justify-content-center'>
              <button onClick={!this.state.clicked ? this.displayInput : this.getStats} className='c-white btn btn-lg btn-info'>Get stats from Steam account</button>
            </div>
          }
          {this.state.clicked === true &&
            <div className='mt-5 d-flex justify-content-center'>
              <label className='steam-id-label' htmlFor="steam-id">
                Enter Steam ID
              </label>
              <input onChange={this.handleChange} type="text" name="steamId" id="steam-id" />
            </div>
          }
          { this.state.userStats !== null &&
            <div className='mt-5 d-flex justify-content-center'>
              <h1>I have the stats!</h1>
            </div>
          }
        </div>
      </div>
    );
  }
}

Profile.contextType = AppContext;
