import React from 'react';
// import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className='navbar'>
        <div className='col-half align-cent'>
          <img className='flat-logo' src="images/logos/flat.png" alt="flat-logo" />
          <a className='player-stats' href="#player-stats">Player Stats</a>
          <a className='spacer font-22 mar-5'> | </a>
          <a className='find-teammates'>Find Teammates</a>
        </div>
        <div className='col-half just-end'>
          <a href='#profile'><img className='logo-only' src="images/logos/round.png" alt="round-logo" /></a>
        </div>
    </nav>
    );
  }
}
