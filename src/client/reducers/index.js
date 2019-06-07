import { combineReducers } from 'redux'
import alert from './alert'
import view from './view'
import newplayer from './newplayer'
import room from './room'
import game from './game'

export default combineReducers({
  view,
  newplayer,
  alert,
  room,
  game,
})