export const newLinesCollision = (state, action) => {
  const malus = [...Array(action.lines).keys()]
  malus.reverse()
  const {
    currentPiece,
    posX,
    posY,
    rotation,
    username,
    } = state
  const myBoard = action.boards.find(board => board.username === username)
  const board = myBoard.board
  const max = []
  currentPiece[rotation].map((line, y) => {
    line.map((box, x) => {
      malus.map(i => {
        if (box && posY + y - i >= 0) {
          if (board[posY + y - i][posX + x]) {
            max.push(i + 1)
          }
        }
      })
    })
  })
  return max.length ? Math.max(...max) : 0
}

const game = (
  state = {
    boards: [{
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      username: 'root',
    }], 
    currentPiece: [
      [[0, 0, 0, 0], [0, 0, 0, 0], ['I', 'I', 'I', 'I'], [0, 0, 0, 0]],
      [[0, 0, 'I', 0], [0, 0, 'I', 0], [0, 0, 'I', 0], [0, 0, 'I', 0]]
    ],
    end: false,
    ms: 1000,
    intervalId: 0,
    lockKey: false,
    nextPiece: [],
    posX: 0,
    posY: 0,
    reset: false,
    restart: true,
    rotation: 0,
    score: 0,
    username: 'root',  
  }, action) => {

  switch (action.type) {
  case 'INIT':
    return {
      ...state,
      winner: false,
    }
  case 'SET_BOARD':
    return {
      ...state,
      boards: action.boards,
      currentPiece: action.currentPiece,
      nextPiece: action.nextPiece,
      posX: action.posX,
      posY: action.posY,
      time: action.time,
      rotation: action.rotation,
      score: action.score,
      username: action.username,
      ms: action.ms,
      restart: true,
      lockKey: false,
    }
  case 'SET_SPECTRES':
    return {
      ...state,
      boards: action.boards,
    }
  case 'SET_X':
    return {
      ...state,
      posX: state.posX + action.inc,
    }
  case 'SET_Y':
    return {
      ...state,
      posY: state.posY + 1,
    }
  case 'SET_ROTATION':
    return {
      ...state,
      rotation: action.rotation,
    }
  case 'SET_LOSE':
    return {
      ...state,
      boards: action.boards,
      end: action.end,
      pending: action.pending,
      score: action.score,
    }
  case 'SET_WINNER':
    return {
      ...state,
      winner: true,
    }
  case 'ADD_BOARD_LINES':
    return {
      ...state,
      boards: action.boards,
      posY: state.posY - newLinesCollision(state, action),
    }
  case 'SET_INCREMENT':
    return {
      ...state,
      intervalId: action.intervalId,
      reset: action.reset,
      restart: action.restart,
    }
  case 'CLEAR_INCREMENT':
    return {
      ...state,
      reset: true,
    }
  case 'SPACE_BAR':
    return {
      ...state,
      ms: 1,
      lockKey: true,
      restart: true,
    }
  default:
    return state
  }
}

export default game
