import React from 'react'
import PropTypes from 'prop-types'
import '../style/lobby.css'

export const ConnectedPlayer = (props) => {
  const { listPlayer } = props
  const players = listPlayer.map((player, i) =>
    <li
      className={ player.leader ? 'leader' : '' }
      key={i} >
      <span>{player.username}</span>
    </li>
  )
  return (
    <ul id='lobbyConnectedPlayers'>{players}</ul>
  )
}

export const LobbyComponent = (props) => {
  const { leader, room, leaveRoom, playerName, initGame } = props

  return (
    <div id='lobby'>
      <div id='lobbyRotate'>
        <div id='lobbyInfo'>
          <h3>Lobby</h3>
          <div id='lobbyRoom'>
            <span>{room.roomName}</span>
            <span>{room.nbPlayers}/{room.maxPlayers}</span>
          </div>
          <ConnectedPlayer
            leaderName={room.leaderName}
            listPlayer={room.listPlayer}
          />
        </div>
      </div>
      <div id='designGame'></div>
      <div id='lobbyButtons'>
        { leader ?
          <div className='lobbyButton' onClick={ () => initGame(room, playerName)} >
          <span>Launch game</span><div className='arrow'></div>
          </div> : '' }
        <div
          className='lobbyButton'
          onClick={ () => leaveRoom(room, playerName, leader) } >
          <span>Quit</span>
          <div className='arrow'></div>
        </div>
      </div>
    </div>
  )
}

LobbyComponent.defaultProps = {
  room: {},
}

LobbyComponent.propTypes = {
  initGame: PropTypes.func,
  leader: PropTypes.bool,
  leaveRoom: PropTypes.func,
  playerName: PropTypes.string,
  room: PropTypes.object,
}

ConnectedPlayer.propTypes = {
  leaderName: PropTypes.string,
  listPlayer: PropTypes.array,
}