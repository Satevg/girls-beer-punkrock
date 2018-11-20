import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import DefaultLayout from './common/components/layout/Default';

import './common/styles/materialize.min.css';

// For Debug
// import ReduxStore from "../components/stores/ReduxStore";
// import addBeers from "../components/actions/index";
// window.store = ReduxStore;
// window.addBeers = addBeers;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <DefaultLayout>
              <Routes />
            </DefaultLayout>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
