import React from 'react'
import PropTypes from 'prop-types'
import ListRooms from './list_rooms'

const JoinRoom = (props) => {
  const {
    activeRoom,
    enterRoom,
    listRoom,
    message,
    selectRoom,
    username,
    } = props

  return (
    <div id='settings'>
      <div id='joinRoom'>
        <div id='joinRoomRotate'>
          <div id='joinRoomInfo'>
              <h3>Join Room</h3>
              {
                (listRoom.length > 0) ?
                  <ListRooms
                    activeRoom={ activeRoom }
                    list={ listRoom }
                    selectRoom={ selectRoom } /> : ''
                }
          </div>
        </div>
        <div id='joinRoomButtons'>
          <div
            className='joinRoomButton'
            onClick={ () => enterRoom(activeRoom, username) }>
            <span>Enter Room</span>
            <div className='arrow'></div>
          </div>
        </div>
      <div id='error'>{message}</div>
      </div>
    </div>
  )
}

JoinRoom.propTypes = {
  activeRoom: PropTypes.object,
  enterRoom: PropTypes.func,
  listRoom: PropTypes.array,
  message: PropTypes.string,
  selectRoom: PropTypes.func,
  username: PropTypes.string,
}

JoinRoom.defaultProps = {
  listRoom: [],
}

export default JoinRoom
