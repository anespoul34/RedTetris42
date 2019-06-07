import React from 'react'
import PropTypes from 'prop-types'
import '../style/gameover.css'
import imgWinner from '../style/winner.png'

const Gameover = (props) => {
  const {
    again,
    board,
    pending,
    leave,
    listPlayers,
    leader,
    room,
    username,
    } = props

  const ending = () => {
    if (!leader || pending) {
      return false
    }
    return true
  }
  const ranking = () => {
    const arr = []
    listPlayers.map(player => {
      if (player.lose) {
        const item = {}
        item.score = player.score
        item.username = player.username
        item.winner = false
        arr.push(item)
      }
    })
    arr.sort((a, b) => a.score - b.score)
    if (listPlayers.length > 1 && arr.length + 1 === listPlayers.length) {
      const winner = listPlayers.find(item => item.lose === false)
      const item = {
        username: winner.username,
        score: winner.score,
        winner: true,
      }
      arr.push(item)
    }
    arr.reverse()
    return arr
  }

  const displayBoard = board.map((line, y) => (
    <div className='line' key={y} >
    {
      line.map((box, x) => (
        <div className={`box ${box}`} key={x} ></div>
      ))
    }
    </div>
  ))

  const displayRanking = ranking().map((player, i) => (
    <li
      className={player.username === username ? 'me' : ''}
      key={i}>
      <span>{player.username}</span>
    </li>
  ))

  return (
   <div id='gameOver'>
    <div id='board'>{ displayBoard }</div>
    <div id='rank'>
      <img src={imgWinner}/>
      <ul>{ displayRanking }</ul>
      <button onClick={ () => leave(room, username, leader) }>Quit</button>
      {
        ending() ?
          <div id='end'>
          <button onClick={ () => again(room, username) } >Play again!</button>
          </div> :
          ''
      }
    </div>
   </div>
  )
}

Gameover.propTypes = {
  again: PropTypes.func,
  board: PropTypes.array,
  currentPiece: PropTypes.array,
  ending: PropTypes.bool,
  leader: PropTypes.bool,
  leave: PropTypes.func,
  listPlayers: PropTypes.array,
  pending: PropTypes.bool,
  room: PropTypes.object,
  score: PropTypes.number,
  username: PropTypes.string,
}

export default Gameover
