import Player from '../models/Player'
import { encodeHTML, errorMessage, cleanErrorMessage, validateNameString, ifNameExist } from './tools'
import data from '../data'

export const createNewUser = (action, socket, lead) => {

  const username = encodeHTML(action.username)
  const leader = lead

  if (username === undefined || validateNameString(username)) {
    socket.emit('action', {
      type: 'VIEW',
      view: 'menus',
    })
    errorMessage('Username must be at least 3 character', socket)
    return
  }
  if (ifNameExist(username)) {
    socket.emit('action', {
      type: 'VIEW',
      view: 'menus',
    })
    errorMessage('Username already taken', socket)
    return
  }


  const newPlayer = new Player(leader, username)
  newPlayer.socketId = socket.id
  data.listPlayer.push(newPlayer)

  socket.emit('action', {
    type: 'NEW_PLAYER',
    username: username,
    leader: leader,
  })
  socket.emit('action', {
    type: 'VIEW',
    view: 'settings',
  })
  cleanErrorMessage(socket)
}

export const handlePlayer = (action, socket) => {
  if (action.type === 'server/NEW_PLAYER') {
    createNewUser(action, socket, action.leader)
  }
}