import { getPlayer, getRoom } from './tools'
import Piece from '../models/Piece'

export const newPiece = (action, socket) => {

  const emitToOpponent = (username, list, action) => {
    list.forEach(player => {
      if (player.username !== username) {
        socket.to(player.socketId).emit('action', action)
      }
    })
  }

  const checkWinner = (list, player) => {
    if (list.length <= 1) {
      socket.emit('action', {
        type: 'SET_LOSE',
        boards: list,
        pending: false,
      })
    }
    else {
      const winners = list.filter(player => player.lose === false)
      const actions = {
        type: 'SET_LOSE',
        boards: list,
        pending: true,
      }
      if (winners.length === 1) {
        actions.pending = false
        socket.to(winners[0].socketId).emit('action', {
          type: 'SET_WINNER',
        })
      }
      socket.emit('action', actions)
      emitToOpponent(player.username, list, actions)
    }
  }

  if (action.type === 'server/SET_NEWPIECE') {

    const player = getPlayer(action.playerName)
    const game = getRoom(action.roomName)

    if (!player.isPossibleToPlace(
      action.currentPiece,
      action.rotation,
      action.posX,
      action.posY)) {
      player.lose = true
      player.darkenBoard()
      player.fixPiece(action.currentPiece, action.posY, action.posX, action.rotation)
      const listBoards = game.listPlayer.map(item => ({
        username: item.username,
        level: item.level,
        line: item.line,
        lose: item.lose,
        board: item.board,
        score: item.score,
        socketId: item.socketId,
      }))
      checkWinner(listBoards, player)
      return
    }

    player.fixPiece(action.currentPiece, action.posY, action.posX, action.rotation)

    const lines = player.removeCompleteLine()
    const level = Math.floor((player.line / 10) + 1)
    player.level = level > 11 ? 11 : level
    const ms = 1000 - (player.level * 80) + 80
    const username = player.username

    const listBoards = game.listPlayer.map(player => ({
      username: player.username,
      level: player.level,
      line: player.line,
      lose: player.lose,
      board: player.board,
      score: player.score,
      socketId: player.socketId,
    }))
    emitToOpponent(player.username, listBoards,
      {
        type: 'SET_SPECTRES',
        boards: listBoards,
      }
    )

    if (lines > 0) {
      game.listPlayer.forEach(player => {
        if (username !== player.username) {
          if (!player.addLines(lines - 1)) {
            socket.to(player.socketId).emit('action', {
              type: 'SET_LOSE',
              boards: listBoards,
              end: true,
              score: player.score,
            })
          }
          else {
            socket.to(player.socketId).emit('action', {
              type: 'ADD_BOARD_LINES',
              boards: listBoards,
              lines: lines,
            })
            socket.to(player.socketId).emit('action', {
              type: 'VIEW',
              view: 'tetris',
            })
          }
        }
      })
    }

    const newPiece = new Piece()
    player.currentPiece++
    player.nextPiece++
    if (game.listPiece.length <= player.nextPiece) {
      if (game.mode === "superminos")
        newPiece.generateRandomSuperminos(game.listPiece)
      else
        newPiece.generateRandomPiece(game.listPiece)
    }

    const currentPiece = game.listPiece[player.currentPiece]
    const x = 5 - Math.round((currentPiece[0].length / 2))
    const y = 2 - currentPiece[0].length

    socket.emit('action', {
      type: 'SET_BOARD',
      boards: listBoards,
      currentPiece: currentPiece,
      nextPiece: game.listPiece[player.nextPiece],
      posX: x,
      posY: y,
      rotation: 0,
      score: player.score,
      username: player.username,
      ms: ms,
    })
    socket.emit('action', {
      type: 'VIEW',
      view: 'tetris',
    })

  }
}
