const newplayer = (state={
    username: "",
  }, action) => {

  switch(action.type) {
    case 'NEW_PLAYER':
      return {
        leader: action.leader,
        username: action.username,
      }
    case 'SET_USER_NAME':
      return {
        ...state,
        username: action.username,
      }
    case 'LEADER_CHANGE':
      return {
        ...state,
        leader: action.leader,
      }
    default:
      return state
  }
}

export default newplayer
