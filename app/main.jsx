'use strict'
import React, {Component} from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import Swipeable from './components/Swipeable'
import Footer from './components/Footer'
import store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'

class App extends Component {
  constructor(){
    super();
    this.state = {
      data: [

      ]
    }
  }
  componentDidMount(){
    axios.get('/api/events')
    .then( res => res.data)
    .then( events => {
      this._swipeable.setCards(events)
      }
    )
  }


  render(){

    {}

    return (
      <MuiThemeProvider>
        <div>
          <Swipeable ref={(swipeableInstance) => {this._swipeable = swipeableInstance}} initialCardsData={[]} />
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}


render (
    <App />,
  document.getElementById('main')
)
