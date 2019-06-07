import React from 'react'
import PropTypes from 'prop-types'
import '../style/settings.css'

const CreateRoom = (props) => {
  const {
    maxPlayers,
    message,
    mode,
    selectMaxPlayers,
    selectMode,
    setRoom,
    setRoomName,
    roomName,
    username,
    } = props

  return (
    <div id='settings'>
      <div id='createRoom'>
        <h3>Create a room</h3>
        <div id='pickARoomName'>
          <input
            onChange={ (e) => setRoomName(e.target.value) }
            placeholder='Pick a Roomname'
            type='text' />
        </div>
        <div id='button_list'>
          <div
            className={ 'playersSelection ' + ((maxPlayers === 1) ? 'select' : 'no-select') }
            onClick={ () => selectMaxPlayers(1) } >
            1
          </div>
          <div
            className={ 'playersSelection ' + ((maxPlayers === 2) ? 'select' : 'no-select') }
            onClick={ () => selectMaxPlayers(2) } >
            2
          </div>
          <div
            className={ 'playersSelection ' + ((maxPlayers === 3) ? 'select' : 'no-select') }
            onClick={ () => selectMaxPlayers(3) } >
            3
          </div>
          <div
            className={ 'playersSelection ' + ((maxPlayers === 4) ? 'select' : 'no-select') }
            onClick={ () => selectMaxPlayers(4) } >
            4
          </div>
        </div>
        <div id='button_list'>
          <div
            className={ 'modeSelection classicSelection ' + ((mode === 'classic') ? 'select' : 'no-select') }
            onClick={ () => selectMode('classic') } >
            Classic
          </div>
          <div
            className={ 'modeSelection gravitySelection ' + ((mode === 'gravity') ? 'Gselect' : 'no-select') }
            onClick={ () => selectMode('gravity') } >
            Gravity
          </div>
          <div
            className={ 'modeSelection superminosSelection ' + ((mode === 'superminos') ? 'Sselect' : 'no-select') }
            onClick={ () => selectMode('superminos') } >
            Superminos
          </div>
          <div
            className={ 'modeSelection invisibleSelection ' + ((mode === 'invisible') ? 'Iselect' : 'no-select') }
            onClick={ () => selectMode('invisible') } >
            Invisible
          </div>
        </div>
      </div>
      <div id='designGame'></div>
      <div id='createRoomButton'>
        <div
          id='setRoomButton'
          onClick={ () => setRoom(username, roomName, maxPlayers, 1, mode) } >
          <span>Begin the experience</span>
          <div className='arrow'></div>
        </div>
        <div id='error'>{ message }</div>
      </div>
    </div>
  )
}

CreateRoom.propTypes = {
  maxPlayers: PropTypes.number,
  message: PropTypes.string,
  mode: PropTypes.string,
  roomName: PropTypes.string,
  selectMaxPlayers: PropTypes.func,
  selectMode: PropTypes.func,
  setRoom: PropTypes.func,
  setRoomName: PropTypes.func,
  username: PropTypes.string,
}

export default CreateRoom
