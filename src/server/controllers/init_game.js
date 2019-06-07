import { getPlayer, getRoom } from './tools'
import Piece from '../models/Piece'

export const initGame = (action, socket) => {

  if (action.type === 'server/INIT_GAME') {
    const leader = getPlayer(action.playerName)
    const game = getRoom(action.room.roomName)
    const newPiece = new Piece()

    game.clearGame()

    if (game.mode === 'superminos')
      newPiece.generateRandomSuperminos(game.listPiece)
    else
      newPiece.generateRandomPiece(game.listPiece)

    game.listPlayer.map(player => player.initBoard())
    game.start = true

    const currentPiece = game.listPiece[0]
    const x = 5 - Math.round((currentPiece[0].length / 2))
    const y = 2 - currentPiece[0].length

    const listBoards = game.listPlayer.map(player => ({
      username: player.username,
      board: player.board,
      line: player.line,
      level: player.level,
      score: player.score,
    }))

    socket.emit('action', {
      type: 'SET_BOARD',
      boards: listBoards,
      currentPiece: currentPiece,
      nextPiece: game.listPiece[leader.nextPiece],
      posX: x,
      posY: y,
      rotation: 0,
      score: 0,
      username: leader.username,
      ms: 1000,
    })
    socket.emit('action', {
      type: 'VIEW',
      view: 'tetris',
    })
    socket.emit('action', {
      type: 'INIT',
    })

    game.listPlayer.forEach(player => {
      if (!player.leader) {
        socket.to(player.socketId).emit('action', {
          type: 'SET_BOARD',
          boards: listBoards,
          currentPiece: game.listPiece[player.currentPiece],
          nextPiece: game.listPiece[player.nextPiece],
          posX: x,
          posY: y,
          rotation: 0,
          score: 0,
          username: player.username,
          ms: 1000,
        })
        socket.to(player.socketId).emit('action', {
          type: 'VIEW',
          view: 'tetris',
        })
        socket.to(player.socketId).emit('action', {
          type: 'INIT',
        })
      }
    })
  }
}
