import React,{ useState } from 'react';
import logo from './logo.svg';
import { Switch,Route } from 'react-router-dom';

import './App.css';
//import Button from './components/Button';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';


class App extends React.Component {


  constructor(props) {
    super(props);
  }


  render(){
    return   (
      <div id="app">
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/registration" component={RegistrationPage} exact />
      
      </Switch>
      </div>);
  }

    

}

export default App;
