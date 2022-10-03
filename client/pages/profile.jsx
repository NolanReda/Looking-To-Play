import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import GetStats from '../components/get-stats';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mmrank: null,
      faceitrank: null,
      hasRanks: false
    };
    this.addRanks = this.addRanks.bind(this);
    this.mmSelect = this.mmSelect.bind(this);
    this.faceitSelect = this.faceitSelect.bind(this);
  }

  componentDidMount() {
    if (this.context.user === null) {
      return;
    }
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
      <>
      <div className='container-prof d-flex me-5 ms-5'>
        <div className='mt-5 me-5'>
          <h1 className='ml-8'>{user.username}</h1>
          <img className='prof-photo' src="/images/logos/default.jpg" alt="" />
            <div className='d-flex align-items-center mt-4 ml-6 wrap'>
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
          <div className='d-flex align-items-center mt-4 ml-8 wrap'>
            <h3 className='c-white'>Faceit Rank</h3>
            {this.state.hasRanks === true &&
              <img className='fa-rank ml-8 ml-2' src={`/images/${this.state.faceitrank}.png`} alt="" />
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
          <GetStats />
        </div>
        {/* <div className='stats-div mt-5 ms-5 me-5'>
          <h1 className='mb-5 ml-8'>Player Stats</h1>
          <h3 className='mb-5'>Win/Loss % ------</h3>
          <h3 className='mb-5'>Headhot % ------</h3>
          <h3 className='mb-5'>K/D ------</h3>
        </div>
        <div className='mt-5 ms-5'>
          <button className='btn btn-lg btn-info'>Add Teammate</button>
        </div> */}
      </div>

      </>
    );
  }
}

Profile.contextType = AppContext;
