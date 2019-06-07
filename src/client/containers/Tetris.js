import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Board from '../components/Board'
import Adversaries from '../components/Adversaries'
import Gameover from '../components/Gameover'
import {
  checkPosX,
  checkPosY,
  checkRotation,
  clearIncrement,
  goDown,
  setIncrement,
  setX,
  setY,
  spaceBar,
} from '../actions/gameActions'
import { leaveRoom, initGame } from '../actions/roomActions'
import '../style/tetris.css'

const Tetris = (props) => {

  const {
    boards,
    initGame,
    leaveRoom,
    nextPiece,
    score,
    username,
    winner,
    } = props

  const myBoard = boards.find(board => board.username === username)
  const spectres = boards.filter(board => board.username !== username)
  const end = myBoard.lose
  const next = nextPiece[0].map((line, i) => {
    if (i < 3) {
      return (
        <div className='line' key={i} >
         {
            line.map((box, y) => (
              <div className={ `box ${box}` } key={y} ></div>
            ))
          }
        </div>
      )
    }
  })

  if (end || winner) {
    clearIncrement()
  }

  return (
    <div id='mainGame'>
      <div id='designGame'></div>
      <div id='game'>
        <div id='gameBoard'>
        { (end || winner) ?
          <Gameover
            again={initGame}
            board={myBoard.board}
            leave={leaveRoom}
            listPlayers={boards}
            {...props}
          /> :
          <Board {...props} myBoard={myBoard} />
        }
        </div>
        <div id='tetrisRightBlock'>
          <div id='gameInfo'>
            <div id='nextPieceInfo'>
              <div id='nextPieceWording'>Next</div>
              <div id='nextPiece'>{next}</div>
            </div>
            <div id='score'>
              <div id='scoreWording'>Level</div>
              <div className='score'>{ myBoard.level == 11 ? "Max" : myBoard.level }</div>
            </div>
            <div id='score'>
              <div id='scoreWording'>Score</div>
              <div className='score'>{ myBoard.score }</div>
            </div>
            <div id='score'>
              <div id='scoreWording'>Lines</div>
              <div className='score'>{ myBoard.line }</div>
            </div>
          </div>
          <Adversaries spectres={spectres}/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  boards: state.game.boards,
  currentPiece: state.game.currentPiece,
  end: state.game.end,
  intervalId: state.game.intervalId,
  leader: state.newplayer.leader,
  lockKey: state.game.lockKey,
  nextPiece: state.game.nextPiece,
  pending: state.game.pending,
  posX: state.game.posX,
  posY: state.game.posY,
  restart: state.game.restart,
  rotation: state.game.rotation,
  room: state.room.activeRoom,
  mode: state.room.mode,
  score: state.game.score,
  username: state.game.username,
  winner: state.game.winner,
})

const mapDispatchToProps = (dispatch) => ({
  checkPosX: (value) => dispatch(checkPosX(value)),
  checkPosY: (value) => dispatch(checkPosY(value)),
  checkRotation: () => dispatch(checkRotation()),
  clearIncrement: (id) => dispatch(clearIncrement(id)),
  initGame: (room, playerName) => dispatch(initGame(room, playerName)),
  goDown: () => dispatch(goDown()),
  leaveRoom: (room, playerName, leader) => dispatch(leaveRoom(room, playerName, leader)),
  setInterval: (id, lock) => dispatch(setInterval(id, lock)),
  setX: (x) => dispatch(setX(x)),
  setY: () => dispatch(setY()),
  setIncrement: () => dispatch(setIncrement()),
  spaceBar: () => dispatch(spaceBar()),
})

Tetris.defaultProps = {
  boards: [],
  nbPlayer: 0,
  score: 0,
  level: 1,
  line: 0,
};

Tetris.propTypes = {
  again: PropTypes.func,
  boards: PropTypes.array,
  clearIncrement: PropTypes.func,
  currentPiece: PropTypes.array,
  end: PropTypes.bool,
  goDown: PropTypes.func,
  initGame: PropTypes.func,
  intervalId: PropTypes.number,
  leader: PropTypes.bool,
  leaveRoom: PropTypes.func,
  nextPiece: PropTypes.array,
  posX: PropTypes.number,
  posY: PropTypes.number,
  restart: PropTypes.bool,
  score: PropTypes.number,
  setIncrement: PropTypes.func,
  setY: PropTypes.func,
  username: PropTypes.string,
  winner: PropTypes.bool,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Tetris)