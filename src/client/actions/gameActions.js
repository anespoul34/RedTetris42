import { store } from '../store'

export const setIncrement = () => (
  (dispatch, getState) => {
    const delay = () => (
      new Promise((resolve, reject) => {
        const { ms } = getState().game
        const interval = setInterval(() => {
          dispatch(checkPosY(false))
        }, ms)
        return resolve({
          type: 'SET_INCREMENT',
          intervalId: interval,
          reset: false,
          restart: false,
        })
      })
    )
    delay()
      .then((res) => {
        dispatch(res)
      })
  }
)

export const clearIncrement = () => {
  const { intervalId } = store.getState().game
  clearInterval(intervalId)
  return { type: 'CLEAR_INCREMENT' }
}

export const spaceBar = () => (
  (dispatch) => {
    dispatch(clearIncrement())
    dispatch({ type: 'SPACE_BAR' })
  }
)

export const setX = (inc) => ({
  type: 'SET_X',
  inc,
})

export const setY = () => ({
  type: 'SET_Y',
})

export const checkPosY = (value) => (
  (dispatch, getState) => {
    const {
      boards,
      currentPiece,
      lockKey,
      posX,
      posY,
      rotation,
      username,
      } = getState().game
    if (value && lockKey) {
      return
    }

    const myBoard = boards.find(board => board.username === username)
    const board = myBoard.board
    const { roomName } = getState().room

    const res = { type: 'SET_Y' }
    currentPiece[rotation].map((line, i) => {
      line.map((box, j) => {
        if (box && posY + i + 1 >= 0) {
          if (board.length <= posY + i + 1 || board[i + posY + 1][j + posX]) {
            dispatch(clearIncrement())
            res.type = 'server/SET_NEWPIECE'
            res.playerName = username
            res.roomName = roomName
            res.currentPiece = currentPiece
            res.rotation = rotation
            res.posX = posX
            res.posY = posY
          }
        }
      })
    })
    dispatch(res)
  }
)

export const checkRotation = () => {
  const {
    boards,
    currentPiece,
    lockKey,
    posX,
    posY,
    rotation,
    username,
    } = store.getState().game

  const myBoard = boards.find(board => board.username === username)
  const board = myBoard.board
  const newRot = (currentPiece.length <= rotation + 1) ? 0 : rotation + 1
  const res = { type: 'SET_ROTATION', rotation: newRot }

  if (lockKey) { return { type: '' } }
  currentPiece[newRot].map((line, i) => {
    line.map((box, j) => {
      if (box && posY + i >= 0) {
        if (board.length <= posY + i ||
          board[i + posY][j + posX] ||
          posX + j < 0 || posX + j >= board[i].length) {
          res.rotation = rotation
        }
      }
      if ((box && posX + j < 0) ||
        (box && posX + j >= board[0].length)) {
        res.rotation = rotation
      }
    })
  })
  return res
}

export const checkPosX = (value) => {
  const {
    boards,
    currentPiece,
    lockKey,
    posX,
    posY,
    rotation,
    username,
    } = store.getState().game

  const myBoard = boards.find(board => board.username === username)
  const board = myBoard.board
  const res = { type: 'SET_X', inc: value }

  if (lockKey) { return { type: '' } }
  currentPiece[rotation].map((line, i) => {
    line.map((box, j) => {
      if (box && (posX + j) >= 0) {
        if (board.length <= posX + j + value ||
          (posY + i >= 0 &&
          board[i + posY][j + posX + value])) {
          res.inc = 0
          return res
        }
      }
      if ((box && posX + j + value < 0) ||
        (box && posX + j + value >= board[0].length)) {
        res.inc = 0
        return res
      }
    })
  })
  return res
}