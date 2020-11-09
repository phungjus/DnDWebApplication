import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharacterCreatePage from './Components/CharacterCreationPage/character-creation-page.jsx';
import Group from './Components/Group'
import Grouplist from './Components/Grouplist'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Forum from './Components/Forum/Forum'
import CharacterSheet from './Components/CharacterSheet/character-sheet.jsx'
import './App.css';

class App extends React.Component {

  state = {
    login : false,
    user: ''
  }

  handleLogin = (user) => {
    this.setState({
      login : true,
      user: user
    })
  }

  render() {
    const login = this.state.login
    if (!login) {
      return (
        <div className="App">
          <Login
            handleLogin={this.handleLogin}
          />
        </div>
      );
    } else {
      return (  
        <BrowserRouter>
          <div className="App">
            <Navbar
              auth={this.state.login}
            />
            <Switch>
              <Route exact path='/' component={CharacterCreatePage} />
              <Route exact path='/Grouplist' component={() => <Grouplist user={this.state.user}/>}/>
              <Route exact path='/Groupadmin' component={() => <Group userType={"Admin"}/>}/>
              <Route exact path='/Groupuser' component={() => <Group userType={"User"}/>}/>
              <Route exact path='/Forum' render={() => (<Forum user={this.state.user}/>)} />
              <Route exact path='/Character' component={CharacterSheet} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default App;
