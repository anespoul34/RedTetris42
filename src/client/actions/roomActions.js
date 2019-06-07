
export const checkUrl = (url) => {

  const res = { type: '' }

  if (url) {
    const arr = url.split('[', -1)
    if (arr.length === 2)	{
      const arr0 = arr[0].split('#')
      const arr1 = arr[1].split(']')
      if (arr0 && arr1) {
        if (arr0.length === 2 && arr1.length === 2)	{
          const room = arr0[1]
          const name = arr1[0]
          const res = {
            type: 'server/CHECK_URL',
            roomName: room,
            username: name,
            url: true,
            leader: false,
            nbPlayers: 1,
            maxPlayers: 4,
          }
          return res
        }
      }
    }
  }
  return res
}

/************************************************************************/
/*                                SERVER                                */
/************************************************************************/

export const setRoom = (username, roomName, maxPlayers, nbPlayers, mode) => {

  return {
    type: "server/SET_ROOM",
    username,
    roomName,
    maxPlayers,
    nbPlayers,
    mode,
  }
}

export const setPlayersNbr = (nbr) => {
  return {
    type: "server/SET_PLAYERS_NBR",
    nbPlayers: nbr,
  }
}


export const enterRoom = (room, username) => {
  return {
    type: "server/ENTER_ROOM",
    activeRoom: room,
    username: username,
  }
}

export const leaveRoom = (room, playerName, leader) => {
  return {
    type: "server/LEAVE_ROOM",
    room: room,
    playerName: playerName,
    leader: leader,
  }
}

export const initGame = (room, playerName) => {
  return {
    type: "server/INIT_GAME",
    room: room,
    playerName: playerName,
  }
}

/************************************************************************/
/*                                CLIENT                                */
/************************************************************************/

export const selectRoom = (room) => {
  return {
    type: "SELECT_ROOM",
    activeRoom: room,
  }
}

export const selectMaxPlayers = (maxPlayers) => {
  return {
    type: "SELECT_MAX_PLAYERS",
    maxPlayers: maxPlayers,
  }
}

export const selectMode = (mode) => {
  return {
    type: "SELECT_MODE",
    mode: mode,
  }
}

export const setRoomName = (roomName) => {
  return {
    type: "SET_ROOM_NAME",
    roomName: roomName,
  }
}
