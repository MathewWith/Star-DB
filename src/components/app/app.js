import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import DammySwapiService from '../../services/dummy-swapi-service'
import Row from '../row'

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

export default class App extends Component {

  

  state = {
    showRandomPlanet: true,
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

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;




    return (
      <ErrorBoundry>
        <SwapiServiceProvider value = {this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChenge = {this.onServiceChenge}/>

            { planet }

            <Row 
            left = {<PersonList />}
            right = {<PersonDetails itemId={11} />}/>


            <Row 
            left = {<StarshipList />}
            right = {<PlanetDetails itemId={5} />}/>

            <Row 
            left = {<PlanetList />}
            right = {<StarshipDetails itemId={9} />}/> 

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
