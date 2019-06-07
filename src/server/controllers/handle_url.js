import {
  encodeHTML,
  getPlayer,
  validateRoomString,
  validateNameString,
  errorMessage,
  ifRoomExist,
  ifNameExist,
  } from './tools'
import { createNewUser } from './handle_player'
import { createNewRoom, joinRoom } from './handle_room'

export const checkUrl = (action, socket) => {
  if (action.type === 'server/CHECK_URL') {
    const roomName = encodeHTML(action.roomName)
    const username = encodeHTML(action.username)

    if (username === undefined || validateNameString(username)) {
      socket.emit('action', {
        type: 'VIEW',
        view: 'menus',
      })
      errorMessage('Username have to be at least 3 character', socket)
      return
    }

    if (ifNameExist(username)) {
      socket.emit('action', {
        type: 'VIEW',
        view: 'menus',
      })
      errorMessage('Username already use', socket)
      return
    }

    if (roomName === undefined || validateRoomString(roomName)) {
      socket.emit('action', {
        type: 'VIEW',
        view: 'menus',
      })
      errorMessage('RoomName has to be at least 3 character', socket)
      return
    }

    if (ifRoomExist(roomName)) {
      createNewUser(action, socket, action.leader)
      const player = getPlayer(username)
      if (player) {
        joinRoom(action, socket)
      }
      else {
        errorMessage('Something went wrong', socket)
        return
      }
    }
    else {
      createNewUser(action, socket, true)
      const player = getPlayer(username)
      if (player) {
        createNewRoom(action, socket)
      }
      else {
        errorMessage('Something went wrong', socket)
        return
      }
    }
  }
}