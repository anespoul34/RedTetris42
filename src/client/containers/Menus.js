import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setNewPlayer, setUserName } from '../actions/playerActions'
import '../style/menu.css'

const Menus = (props) => {
  const {
    listRoom,
    message,
    setNewPlayer,
    setUserName,
    username,
    } = props
  const isList = listRoom.length ? 'displayButton' : 'undisplayButton'

  return (
    <div id='menu'>
      <div id='pickAName'>
        <input
          onChange={ (e) => setUserName(e.target.value) }
          placeholder='Pick a Username'
          type='text' />
      </div>
      <div id='designGame'></div>
      <div id='menuButtons'>
        <div
          className='displayButton'
          onClick={ () => setNewPlayer(true, username) }>
          <span>CREATE</span>
          <span className='aRoom'>a room</span>
          <div className='arrow'></div>
        </div>
        <div
          className={isList}
          onClick={ () => setNewPlayer(false, username) }>
          <span>JOIN</span>
          <span className='aRoom'>a room</span>
          <div className='arrow'></div>
        </div>
      </div>
      <div id='error'>{message}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  message: state.alert.message,
  username: state.newplayer.username,
  leader: state.newplayer.leader,
  listRoom: state.room.listRoom,
  view: state.view.view,
})

const mapDispatchToProps = (dispatch) => ({
  setUserName: (username) => dispatch(setUserName(username)),
  setNewPlayer: (leader, username) => dispatch(setNewPlayer(leader, username)),
})

Menus.propTypes = {
  listRoom: PropTypes.array,
  message: PropTypes.string,
  setNewPlayer: PropTypes.func,
  setUserName: PropTypes.func,
  username: PropTypes.string,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menus)
