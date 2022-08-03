import React from 'react';
import Navbar from './components/navbar';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import PlayerGraph from './pages/player-graph';
import PageContainer from './components/page-container';
import Auth from './pages/Auth';
import jwtDecode from 'jwt-decode';
import Profile from './pages/profile';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Profile />;
    }
    if (path === 'player-stats') {
      return <PlayerGraph />;
    }
    if (path === 'sign-up' || path === 'sign-in') {
      return <Auth />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn } = this;
    const contextValue = { user, route, handleSignIn };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar />
           <PageContainer>
            { this.renderPage() }
          </PageContainer>
        </>
      </AppContext.Provider>
    );
  }
}
