import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from '../src/actions/authActions';
import { Component } from 'react';
import styled from '@emotion/styled';

import Landing from './components/landing.component';
import RegisterUser from './components/register-user.component';
import LoginUser from './components/login-user.component';

import img from '../src/img/gradient.webp';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Landing}/>
          <Route 
            exact 
            path="/register" 
            render={() => (
              <AppWrapper>
                <AuthWrapper>
                  <RegisterUser/>
                </AuthWrapper>
              </AppWrapper>
            )}
          />
          <Route 
            exact 
            path="/login" 
            render={() => (
              <AppWrapper>
                <AuthWrapper>
                  <LoginUser/>
                </AuthWrapper>
              </AppWrapper>
            )}
          />
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
  backgroundColor: 'white',
  '@media (min-height: 650px)': {
    display: 'table-cell', 
    verticalAlign: 'middle',
    '@media (min-width: 650px)': {
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover'
    } 
  }
});

export default App;