'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import Tinderable from './components/IndexComponent'
import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'

const Home = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)


let data = [
    {
        title: 'A wonderful day',
        text: '—— - ——— - - - ——— ———— - — ——— —— - ————— - - ———— —— - ——— - - - ——— ———— - — ——— —— -',
        image: 'portrait-1.jpg',
        id: '1'
    },
    {
        title: 'My amazing journey',
        text: ' - — ——— —— - ————— - - ———— —— - ——— - - - ——— ———— - — ——— —— - ————— - - ——— - - - ——— ———— ',
        image: 'portrait-2.jpg',
        id: '2'
    },
    {
        title: 'Three recipes without cocoa',
        text: ' - — ——— —— - ————— - - ———— —— - ——— - - - ——— ———— - — ——— —— - ————— - - ——— - - - ———',
        image: 'portrait-3.jpg',
        id: '3'
    },
    {
        title: 'Generic clickbait title',
        text: ' —— ———— - — ——— —— - ————— - - ———— —— - ——— - - - ——— ———— - — ——— —— - ————— - - ———— —— - ——— - - - ——— ———— - — ——— —— - ————— - - ———— - ——— ',
        image: 'portrait-4.jpg',
        id: '4'
    }
];

render (
  <Provider store={store}>
    <Tinderable initialCardsData={data} />
  </Provider>,
  document.getElementById('main')
)
