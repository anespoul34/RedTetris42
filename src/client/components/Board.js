import React from 'react'
import PropTypes from 'prop-types'

const Board = (props) => {
  const {
    myBoard,
    checkPosY,
    checkPosX,
    checkRotation,
    clearIncrement,
    currentPiece,
    posY,
    posX,
    restart,
    rotation,
    spaceBar,
    setIncrement,
    mode,
  } = props

  const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
  }

  document.onkeydown = (e) => {
    switch (e.keyCode) {
    case KEY.LEFT:
      return checkPosX(-1)
    case KEY.UP:
      return checkRotation()
    case KEY.RIGHT:
      return checkPosX(1)
    case KEY.DOWN:
      return checkPosY(true)
    case KEY.SPACE:
      return spaceBar()
    default:
      return
    }
  }

  if (restart) {
    clearIncrement()
    setIncrement()
  }

  const onBoard = (y, x) => {
    if (x - posX >= 0 && x - posX < currentPiece[rotation][0].length &&
      y - posY >= 0 && y - posY < currentPiece[rotation].length) {
      return currentPiece[rotation][y - posY][x - posX]
    }
  }

  const displayBoard = myBoard.board.map((line, y) => (
    <div className='line' key={y} >
    {
      line.map((box, x) => {
        let invi = ''
        const piece = onBoard(y, x) || box
        if (mode === "invisible" && piece === box)
          invi = "invisible"
        return <div className={`box ${piece} ${invi}` } key={x} ></div>
      })
    }
    </div>
  ))
  return <div id='board' className={mode}>{displayBoard}</div>
}

Board.propTypes = {
  checkPosX: PropTypes.func,
  checkPosY: PropTypes.func,
  checkRotation: PropTypes.func,
  clearIncrement: PropTypes.func,
  currentPiece: PropTypes.array,
  goDown: PropTypes.func,
  myBoard: PropTypes.object,
  posX: PropTypes.number,
  posY: PropTypes.number,
  restart: PropTypes.bool,
  rotation: PropTypes.number,
  setIncrement: PropTypes.func,
  spaceBar: PropTypes.func,
  mode: PropTypes.string,
}

Board.defaultProps = {
  myBoard: {
    username: '',
    board: [],
  },
}

export default Board
