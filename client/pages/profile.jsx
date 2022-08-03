import React from 'react';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {

  render() {
    const { user } = this.context;
    return (
      <>
        <h1>Welcome {user.username}</h1>
      </>
    );
  }
}

Profile.contextType = AppContext;
