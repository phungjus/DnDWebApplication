import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharacterCreatePage from './Components/CharacterCreationPage/character-creation-page.jsx';
import Group from './Components/Group'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Forum from './Components/Forum/Forum'
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
        <BrowserRouter>
          <div>
            <Navbar
              auth={this.state.login}
            />
            <Switch>
              <Route exact path='/' component={CharacterCreatePage} />
              <Route exact path='/Group' component={Group}/>
              <Route exact path='/Forum' render={() => (<Forum />)} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default App;
