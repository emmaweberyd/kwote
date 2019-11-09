import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from '../src/actions/authActions';
import { Component } from 'react';

import Navbar from './components/navbar.component';
import Landing from './components/landing.component';
import RegisterUser from './components/register-user.component';
import LoginUser from './components/login-user.component';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Navbar/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/register" component={RegisterUser}/>
            <Route exact path="/login" component={LoginUser}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;