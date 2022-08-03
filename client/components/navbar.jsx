import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {

    const { user } = this.context;

    return (
      <nav className='navbar'>
        <div className='col-half align-cent'>
          <img className='flat-logo' src="images/logos/flat.png" alt="flat-logo" />
          { user !== null &&
            <>
              <a className='player-stats' href="#player-stats">Player Stats</a>
              <a className='spacer font-22 mar-5'> | </a>
              <a className='find-teammates'>Find Teammates</a>
            </>
          }
          {
            user === null &&
            <>
              <a className='player-stats' href="#sign-up">Sign Up</a>
              <a className='spacer font-22 mar-5'> | </a>
              <a className='find-teammates' href='#sign-in'>Sign In</a>
            </>
          }
        </div>
        <div className='col-half just-end'>
          <a href={user ? '#' : null}><img className='logo-only' src="images/logos/round.png" alt="round-logo" /></a>
        </div>
    </nav>
    );
  }
}

Navbar.contextType = AppContext;
