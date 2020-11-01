import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharacterCreatePage from './character-creation-page/character-creation-page.jsx';
import './App.css';

function App() {
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

export default App;
