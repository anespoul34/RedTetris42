import data from '../data'

const MIN_ROOMNAME = 3
const MIN_USERNAME = 3

export const getPlayer = (username) => (
  data.listPlayer.find(item => item.username === username)
)

export const getRoom = (roomName) => (
  data.listRoom.find(item => item.roomName === roomName)
)

export const getPlayerBySocketId = (id) => (
  data.listPlayer.find(item => item.socketId === id)
)

export const encodeHTML = (s) => (
  s.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
)

export const errorMessage = (string, socket) => {
  socket.emit('action', {
    type: 'ERROR_MESSAGE',
    message: string,
  })
}

export const cleanErrorMessage = (socket) => {
  socket.emit('action', {
    type: 'ERROR_MESSAGE',
    message: '',
  })
}

export const validateNameString = (str) => (
  str.length < MIN_USERNAME
)

export const validateRoomString = (str) => (
  str.length < MIN_ROOMNAME
)

export const ifNameExist = (username) => (
  data.listPlayer.find(item => item.username === username)
)

export const ifRoomExist = (roomName) => (
  data.listRoom.find(item => item.roomName === roomName)
)