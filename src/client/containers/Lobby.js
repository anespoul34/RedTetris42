import React from 'react'
import { connect } from 'react-redux'
import { setView } from '../actions/viewActions'
import { leaveRoom, initGame } from '../actions/roomActions'
import { LobbyComponent } from '../components/lobby_component'

const Lobby = (props) => {
  return (
    <LobbyComponent {...props} />
  )
}

const mapStateToProps = (state) => {
  return {
  	message: state.alert.message,
    leader: state.newplayer.leader,
    room: state.room.activeRoom,
    playerName: state.newplayer.username,
  }
}

const mapDispatchToProps = (dispatch) => ({
  view: (view) => dispatch(setView(view)),
  initGame: (room, playerName) => dispatch(initGame(room, playerName)),
  leaveRoom: (room, playerName, leader) => dispatch(leaveRoom(room, playerName, leader))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lobby)
