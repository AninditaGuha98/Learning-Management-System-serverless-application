import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
// import aws_exports from './aws-exports';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Security from './components/Security';
import Chat from './components/Chat';
import LexBot from './components/LexBot';
import Analysis1 from './components/Analysis1';
import DataProcessing from './components/DataProcessing';
import Analysis2 from './components/Analysis2';
import Land_page from './components/Land_page';
// import firebase from "./components/config/fbConfig";
// import { withAuthenticator } from 'aws-amplify-react'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/security" exact component={Security} />
            <Route path="/chat" exact component={Chat} />
            <Route path="/lex" exact component={LexBot} />
            <Route path="/analysis" exact component={Analysis1} />
            <Route path="/" exact component={Land_page} />
            <Route path="/dataProcessing" exact component={DataProcessing} />
            <Route path="/analysis2" exact component={Analysis2} />
            {/* <Route path="/" exact component={Login} /> */}
            {/* <Route path="/home" exact component={Home} /> */}
            {/* {this.state.user ? (<Home />) : (<Login />)} */}
          </Switch>
          
        </BrowserRouter>
        
      </div>
    );
  }
}
export default (App);
