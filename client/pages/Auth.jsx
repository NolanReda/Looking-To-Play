import React from 'react';
import AppContext from '../lib/app-context';
import AuthForm from '../components/auth-form';

export default class AuthPage extends React.Component {
  render() {

    const { route } = this.context;

    return (
      <div className='row align-items-center'>
        <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
          <header className="text-center">
            <img className='stacked-bg' src="images/logos/stacked-bg.png" alt="main-logo" />
            <h2 className='sign border-none bg-none' type='button' value='sign-up'>Sign Up</h2>
          </header>
          <div className="p-3 ">
            <AuthForm
              key={route.path}
              action={route.path}
              />
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
