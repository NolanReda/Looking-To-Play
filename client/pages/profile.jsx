import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStats: null,
      clicked: false,
      steamId: '',
      mmrank: null,
      faceitrank: null,
      hasRanks: false
    };
    this.displayInput = this.displayInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getStats = this.getStats.bind(this);
    this.addRanks = this.addRanks.bind(this);
    this.mmSelect = this.mmSelect.bind(this);
    this.faceitSelect = this.faceitSelect.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context.user;
    const req = {
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    };
    fetch(`/api/ranks/load/${userId}`, req)
      .then(res => res.json())
      .then(result => {
        if (!result.rows) {
          return null;
        }
        this.setState({
          mmrank: result.rows[0].rankId,
          faceitrank: result.rows[1].rankId,
          hasRanks: true
        });
      });
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
        this.setState({ userStats: result.playerstats.stats });
      });
    this.setState({ clicked: false });
  }

  mmSelect(event) {
    this.setState({ mmrank: event.target.value });
  }

  faceitSelect(event) {
    this.setState({ faceitrank: event.target.value });
  }

  addRanks(event) {
    const { userId } = this.context.user;
    const { mmrank, faceitrank } = this.state;
    const req = {
      method: 'POST',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    };
    fetch(`/api/ranks/${mmrank}/${faceitrank}/${userId}`, req)
      .then(res => res.json())
      // eslint-disable-next-line no-console
      .then(result => console.log(result));

    this.setState({ hasRanks: true });

    event.preventDefault();
  }

  render() {

    const { user } = this.context;

    if (!this.context.user) return <Redirect to='sign-in' />;

    return (
      <div className='container-prof'>
        <div className='mt-5'>
          <h1 className='ml-8'>{user.username}</h1>
          <img className='prof-photo' src="/images/logos/default.jpg" alt="" />
          <div className='d-flex align-items-center mt-4'>
            <h4 className='c-white '>Matchmaking Rank</h4>
            { this.state.hasRanks === false &&
              <select className='m-dropdown' onChange={this.mmSelect}>
                <option value="1">Silver 1</option>
                <option value="2">Silver 2</option>
                <option value="3">Silver 3</option>
                <option value="4">Silver 4</option>
                <option value="5">Silver Elite</option>
                <option value="6">Silver Elite Master</option>
                <option value="7">Gold 1</option>
                <option value="8">Gold 2</option>
                <option value="9">Gold 3</option>
                <option value="10">Gold Master</option>
                <option value="11">Master Guardian 1</option>
                <option value="12">Master Guardian 2</option>
                <option value="13">Master Guardian Elite</option>
                <option value="14">Distinguished Master Guadrian</option>
                <option value="15">Legendary Eagle</option>
                <option value="16">Legendary Eagle Master</option>
                <option value="17">Supreme Master First Class</option>
                <option value="18">The Global Elite</option>
              </select>
            }
            { this.state.hasRanks === true &&
              <img className='rank-badge ms-3' src={`/images/${this.state.mmrank}.png`} alt="" />
            }
          </div>
          <div className='d-flex align-items-center mt-4'>
            <h3 className='c-white'>Faceit Rank</h3>
            {this.state.hasRanks === true &&
              <img className='fa-rank ml-8' src={`/images/${this.state.faceitrank}.png`} alt="" />
            }
            {this.state.hasRanks === false &&
              <select className='f-dropdown' onChange={this.faceitSelect}>
                <option value="19">1</option>
                <option value="20">2</option>
                <option value="21">3</option>
                <option value="22">4</option>
                <option value="23">5</option>
                <option value="24">6</option>
                <option value="25">7</option>
                <option value="26">8</option>
                <option value="27">9</option>
                <option value="28">10</option>
              </select>
            }
          </div>
          {this.state.hasRanks === false &&
            <div className='d-flex justify-content-center mt-3'>
              <button onClick={this.addRanks} className='c-white btn btn-lg btn-info'>send ranks</button>
            </div>
          }
          { this.state.userStats === null &&
            <div className='mt-5 d-flex justify-content-center'>
              <button onClick={!this.state.clicked ? this.displayInput : this.getStats} className='c-white btn btn-lg btn-info'>{!this.state.clicked ? 'Get stats from Steam account' : 'Get stats now'}</button>
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
            <div className='stats-display mt-5 d-flex justify-content-center'>
              <h1>I have the stats!</h1>
            </div>
          }
        </div>
      </div>
    );
  }
}

Profile.contextType = AppContext;
