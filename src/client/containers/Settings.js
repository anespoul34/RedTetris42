import React from 'react'
import { connect } from 'react-redux'
import { setView } from '../actions/viewActions'
import { newRoom, selectRoom, enterRoom, selectMaxPlayers, selectMode, setRoom, setRoomName } from '../actions/roomActions'
import CreateRoom from '../components/create_room'
import JoinRoom from '../components/join_room'

const Settings = (props) => {

  if (props.leader) {
    return (
      <CreateRoom {...props}/>
    )
  } else {
    return (
      <JoinRoom {...props}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.alert.message,
    leader: state.newplayer.leader,
    username: state.newplayer.username,
    listRoom: state.room.listRoom,
    activeRoom: state.room.activeRoom,
    roomName: state.room.roomName,
    maxPlayers: state.room.maxPlayers,
    mode: state.room.mode,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setRoom: (username, roomName, maxPlayers, nbPlayers, mode) => dispatch(setRoom(username, roomName, maxPlayers, nbPlayers, mode)),
  setRoomName: (roomName) => dispatch(setRoomName(roomName)),
  selectMaxPlayers: (max) => dispatch(selectMaxPlayers(max)),
  selectMode: (mode) => dispatch(selectMode(mode)),
  selectRoom: (roomName) => dispatch(selectRoom(roomName)),
  enterRoom: (roomName, playername) => dispatch(enterRoom(roomName, playername)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings)
