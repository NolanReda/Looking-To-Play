import React from 'react';
// import Home from './pages/home';
import Navbar from './components/navbar';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';
import PlayerGraph from './pages/player-graph';
import PageContainer from './components/page-container';
// import { response as data } from './components/mm-chart';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: false,
      route: parseRoute(window.location.hash)
    };
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === 'player-stats') {
      return <PlayerGraph />;
    }
    //   if (path === 'profile') {

  //   }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const contextValue = { user, route };
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
