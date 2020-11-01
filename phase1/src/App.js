import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharacterCreatePage from './character-creation-page/character-creation-page.jsx';
import Login from './Components/Login'
import './App.css';

class App extends React.Component {

  state = {
    login : false
  }

  handleLogin = () => {
    this.setState({
      login : true
    })
  }

  render() {
    const login = this.state.login
    if (!login) {
      return (
        <div>
          <Login
            handleLogin={this.handleLogin}
          />
        </div>
      );
    } else {
      return (
        <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={CharacterCreatePage} />
          </Switch>
        </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
