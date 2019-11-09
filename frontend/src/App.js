import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from '../src/actions/authActions';
import { Component } from 'react';
import styled from '@emotion/styled';
import core from '@emotion/core';

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
          <AppWrapper>
            <Route exact path="/" component={Landing}/>
            <AuthWrapper>
              <Route exact path="/register" component={RegisterUser}/>
              <Route exact path="/login" component={LoginUser}/>
            </AuthWrapper>
          </AppWrapper>
        </Router>
      </Provider>
    );
  }
}

let AppWrapper = styled.div({
  position: 'absolute',
  display: 'table',
  height: '100%',
  width: '100%'
});

let AuthWrapper = styled.div({
  display: 'table-cell', 
  verticalAlign: 'middle'
})

export default App;