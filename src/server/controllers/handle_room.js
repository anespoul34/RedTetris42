import Game from '../models/Game'
import {
  cleanErrorMessage,
  encodeHTML,
  errorMessage,
  getPlayer,
  getRoom,
  ifRoomExist,
  validateRoomString,
  } from './tools'
import data from '../data'

export const createNewRoom = (action, socket) => {

  const roomName = encodeHTML(action.roomName)
  const leaderName = encodeHTML(action.username)
  const player = getPlayer(leaderName)

/*
*******************************************************************************
                                    CHECKS
*******************************************************************************
*/

  if (roomName === undefined || validateRoomString(roomName)) {
    socket.emit('action', {
      type: 'VIEW',
      view: 'settings',
    })
    errorMessage('Room name must be at least 3 character', socket)
    return
  }

  if (ifRoomExist(roomName)) {
    socket.emit('action', {
      type: 'VIEW',
      view: 'settings',
    })
    errorMessage('Room name already taken', socket)
    return
  }

  if (!player) {
    socket.emit('action', {
      type: 'VIEW',
      view: 'menus',
    })
    errorMessage('Something went wrong', socket)
    return
  }

/*
*******************************************************************************
                                  CREATE ROOM
*******************************************************************************
*/

  const newRoom = new Game(leaderName, roomName, action.maxPlayers, action.mode)
  player.associatedRoom = roomName
  newRoom.addPlayer(player)
  data.listRoom.push(newRoom)

  socket.join(roomName)

  socket.emit('action', {
    type: 'SET_ROOM',
    roomName: roomName,
    leaderName: leaderName,
    maxPlayers: action.maxPlayers,
    nbPlayers: action.nbPlayers,
    mode: action.mode,
    activeRoom: newRoom,
  })
  socket.emit('action', {
    type: 'SET_ROOM_LIST',
    listRoom: data.listRoom,
  })
  socket.broadcast.emit('action', {
    type: 'SET_ROOM_LIST',
    listRoom: data.listRoom,
  })
  socket.emit('action', {
    type: 'VIEW',
    view: 'lobby',
  })
  cleanErrorMessage(socket)
}

/*
*******************************************************************************
                                JOIN ROOM
*******************************************************************************
*/

export const joinRoom = (action, socket) => {

  let room = {}
  if (action.activeRoom) {
    room = getRoom(action.activeRoom.roomName)
  }
  else if (action.url === true) {
    room = getRoom(action.roomName)
  }
  else {
    return
  }

  const player = getPlayer(action.username)

  if (room.start) {
    errorMessage('This room is already launched.', socket)
    return
  }

  if (room.nbPlayers < room.maxPlayers) {
    player.associatedRoom = room.roomName
    socket.join(room.roomName)
    room.addPlayer(player)

    socket.emit('action', {
      type: 'SET_ROOM',
      roomName: room.roomName,
      maxPlayers: room.maxPlayers,
      nbPlayers: room.nbPlayers,
      mode: room.mode,
      activeRoom: room,
    })
    socket.emit('action', {
      type: 'SET_ROOM_LIST',
      listRoom: data.listRoom,
    })
    socket.broadcast.emit('action', {
      type: 'SET_ROOM_LIST',
      listRoom: data.listRoom,
    })
    socket.to(room.roomName).emit('action', {
      type: 'SET_ROOM',
      roomName: room.roomName,
      maxPlayers: room.maxPlayers,
      nbPlayers: room.nbPlayers,
      mode: room.mode,
      activeRoom: room,
    })
    socket.emit('action', {
      type: 'VIEW',
      view: 'lobby',
    })
    cleanErrorMessage(socket)
  }
  else {
    errorMessage('This room is full.', socket)
  }
}

/*
*******************************************************************************
                                  LEAVE ROOM
*******************************************************************************
*/

export const leaveRoom = (action, socket) => {

  const room = getRoom(action.room.roomName)
  const player = getPlayer(action.playerName)

  room.removePlayer(player)

  if (room.nbPlayers === 1 && room.start === true) {
    socket.to(room.listPlayer[0].socketId).emit('action', {
      type: 'SET_WINNER',
    })
  }

  if (room.nbPlayers === 0) {
    const index = data.listRoom.indexOf(room)
    if (index > -1) {
      data.listRoom.splice(index, 1)
    }
  }
  else if (player.leader) {
    room.leaderName = room.listPlayer[0].username
    room.listPlayer[0].leader = true


    socket.to(room.listPlayer[0].socketId).emit('action', {
      type: 'LEADER_CHANGE',
      leader: true,
    })
  }

  socket.to(room.roomName).emit('action', {
    type: 'SET_NEW_LEADER',
    activeRoom: room,
    leaderName: room.leaderName,
    nbPlayers: room.nbPlayers,
  })
  socket.broadcast.emit('action', {
    type: 'SET_ROOM_LIST',
    listRoom: data.listRoom,
  })
  const index = data.listPlayer.indexOf(player)
  if (index > -1) {
    data.listPlayer.splice(index, 1)
  }

  socket.emit('action', {
    type: 'NEW_PLAYER',
    leader: false,
    username: '',
  })
  socket.emit('action', {
    type: 'VIEW',
    view: 'Menus',
  })
  socket.emit('action', {
    type: 'SET_ROOM_LIST',
    listRoom: data.listRoom,
  })
  socket.emit('action', {
    type: 'SET_ROOM',
    roomName: '',
    maxPlayers: 1,
    nbPlayers: 1,
    activeRoom: null,
  })
  socket.leave(room.roomName)

}

export const handleRoom = (action, socket) => {
  if (action.type === 'server/SET_ROOM') {
    createNewRoom(action, socket)
  }
  if (action.type === 'server/ENTER_ROOM') {
    joinRoom(action, socket)
  }
  if (action.type === 'server/LEAVE_ROOM') {
    leaveRoom(action, socket)
  }
}
