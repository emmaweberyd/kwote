import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import RegisterUser from './components/register-user.component';
import LoginUser from './components/login-user.component';
import { Provider } from 'react-redux';
import store from './store';
import Posts from './components/posts.component';
import { loadUser } from '../src/actions/authActions';
import { Component } from 'react';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Route path="/main" component={Posts}/>
            <Route path="/register" component={RegisterUser}/>
            <Route path="/login" component={LoginUser}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;