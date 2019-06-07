import React from 'react'
import PropTypes from 'prop-types'

const ListRooms = (props) => {

  const { list, activeRoom, selectRoom } = props
  const rooms = list.map((room, i) =>
    <li
      className={ (activeRoom === room) ? 'select' : 'no-select' }
      key={i}
      onClick={() => selectRoom(room)}>
      <div className='room'>
        <span>{room.roomName}</span>
        <span>{room.nbPlayers}/{room.maxPlayers}</span>
      </div>
    </li>
  )
  return (
    <ul id='listRooms'>{rooms}</ul>
  )
}

ListRooms.propTypes = {
  activeRoom: PropTypes.object,
  list: PropTypes.array,
  selectRoom: PropTypes.func,
}

ListRooms.defaultProps = {
  list: [],
}

export default ListRooms
