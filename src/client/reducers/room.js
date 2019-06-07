const room = (state = {
  roomName: "",
  maxPlayers: 1,
  mode: "classic",
  listRoom: [],
  }, action) => {

  switch(action.type) {
    case 'SET_ROOM':
      return {
        ...state,
        roomName: action.roomName,
        maxPlayers: action.maxPlayers,
        nbPlayers: action.nbPlayers,
        mode: action.mode,
        activeRoom: action.activeRoom,
      }
    case 'SET_PLAYERS_NBR':
      return {
        ...state,
        nbPlayers: action.nbPlayers
      }
    case 'SET_ROOM_NAME':
      return {
        ...state,
        roomName: action.roomName
      }
    case 'SELECT_ROOM':
      return {
        ...state,
        activeRoom: action.activeRoom
      }
    case 'ENTER_ROOM':
      return {
        ...state,
        activeRoom: action.activeRoom
      }
    case 'SELECT_MAX_PLAYERS':
      return {
        ...state,
        maxPlayers: action.maxPlayers
      }
    case 'SELECT_MODE':
      return {
        ...state,
        mode: action.mode
      }
    case 'SET_ROOM_LIST':
      return {
        ...state,
        listRoom: action.listRoom
      }
    case 'SET_NEW_LEADER':
      return {
        ...state,
        activeRoom: action.activeRoom,
        leaderName: action.leaderName,
        nbPlayers: action.nbPlayers,
      }
    default:
      return state
  }
}

export default room