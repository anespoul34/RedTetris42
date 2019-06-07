import React from 'react'
import PropTypes from 'prop-types'
import Menus from '../containers/Menus'
import Settings from '../containers/Settings'
import Lobby from '../containers/Lobby'
import Tetris from '../containers/Tetris'
import { connect } from 'react-redux'
import img from '../style/tetris.png'

require('../style/fonts/fonts.css')

export const View = (props) => {
  const { step } = props

  if (step === 'lobby') {
    return <Lobby />
  }
  else if (step === 'settings') {
    return <Settings />
  }
  else if (step === 'tetris') {
    return <Tetris />
  }
  else {
    return <Menus />
  }
}

export const App = (props) => {

  return (
    <div id='main'>
      <div id='mainTitle'>
        <img alt='Tetris' src={img} />
      </div>
      <View step={props.view} />
    </div>
  )
}

export const mapStateToProps = (state) => ({
  view: state.view.view,
})

View.propTypes = {
  step: PropTypes.string,
}

App.propTypes = {
  view: PropTypes.string,
}

export default connect(mapStateToProps, null)(App)
