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
import { login, logout, checkSession } from './Actions/User.js'

class App extends React.Component {

  state = {
    login : false,
    user: null
  }

  componentDidMount() {
    checkSession(this)
  }

  handleLogin = (username, password) => {
    login(username, password, (user) => {
      if (user !== "undefined") {
        this.setState({
          login: true,
          user: user
        })
      }
    })
  }

  handleLogout = () => {
    logout(this)
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
              handleLogout={this.handleLogout}
            />
            <Switch>
              <Route exact path='/' component={() => <CharacterCreatePage userid={this.state.user._id}/>} />
              <Route exact path='/Grouplist' component={() => <Grouplist user={this.state.user}/>}/>
              <Route exact path='/Group/:gid' render={props => <Group {...props} user={this.state.user}/>}/>
              <Route exact path='/Groupuser' component={() => <Group userType={"User"}/>}/>
              <Route exact path='/Forum' render={() => (<Forum user={this.state.user}/>)} />
              <Route exact path='/Character' render={() => (<CharacterSheet user={this.state.user} userid={this.state.user._id}/>)} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default App;
