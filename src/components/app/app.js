import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import DammySwapiService from '../../services/dummy-swapi-service'

import { PeoplePage } from '../pages'
import { PlanetsPage } from '../pages'
import { StarshipsPage, LoginPage, SecretPage } from '../pages';

import SwapiService from "../../services/swapi-service";
import { SwapiServiceProvider } from '../swapi-service-context';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

import './app.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {

  

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
    return console.log(this.state.isLoggedIn)
  };

  onServiceChenge = () => {
    this.setState(({swapiService}) => {
        const Service = swapiService instanceof SwapiService ? DammySwapiService : SwapiService;

        console.log('switched to', Service.name);
        
        return {
          swapiService : new Service()
        }
    })
  }


  render() {

    const {isLoggedIn} = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value = {this.state.swapiService}>
          <Router>
          <div className="stardb-app">
            <Header onServiceChenge = {this.onServiceChenge}/>

            <RandomPlanet />
            <Switch>
            <Route path ='/' 
              render = {() => <h1>Welcom to Star DB</h1>}
              exact />
            <Route path = '/people/:id?' component = {PeoplePage} />
            <Route path = '/planets' component = {PlanetsPage} />
            <Route 
              path = '/starships' component = {StarshipsPage}
              exact />
            <Route path = '/starships/:id' 
              render = {({match}) => {
                const {id} = match.params;
                return <StarshipDetails itemId = {id}/>
              }} />
            <Route path = "/login" 
              render = {() => (
                <LoginPage 
                isLoggedIn = {isLoggedIn}
                onLogin = {this.onLogin}/>
              )}/>
            <Route path = "/secret" 
              render = {() => (
                <SecretPage  isLoggedIn = {isLoggedIn}/>
              )}/>
            </Switch>
          </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
