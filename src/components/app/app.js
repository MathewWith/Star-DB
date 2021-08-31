import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import DammySwapiService from '../../services/dummy-swapi-service'

import { PeoplePage } from '../pages'
import { PlanetsPage } from '../pages'
import { StarshipsPage } from '../pages';

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

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {

  

  state = {
    swapiService: new SwapiService()
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

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value = {this.state.swapiService}>
          <Router>
          <div className="stardb-app">
            <Header onServiceChenge = {this.onServiceChenge}/>

            <RandomPlanet />

            <Route path = '/people' component = {PeoplePage} />
            <Route path = '/planets' component = {PlanetsPage} />
            <Route path = '/starships' component = {StarshipsPage} />

          </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
