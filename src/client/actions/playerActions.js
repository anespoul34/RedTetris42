export const setNewPlayer = (leader, username) => ({
  type: 'server/NEW_PLAYER',
  leader,
  username,
})

export const setUserName = (username) => ({
  type: 'SET_USER_NAME',
  username: username,
})