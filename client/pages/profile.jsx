import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Profile extends React.Component {

  render() {

    const { user } = this.context;

    if (!this.context.user) return <Redirect to='sign-in' />;

    return (
      <>
        <h1>Welcome {user.username}</h1>
      </>
    );
  }
}

Profile.contextType = AppContext;
