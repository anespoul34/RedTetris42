import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import { checkUrl } from './actions/roomActions'
import { store } from './store'
import url from 'url'
import './style/global.css'

const myURL = url.parse(window.location.href).hash

ReactDom.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('tetris'))

store.dispatch(checkUrl(myURL))