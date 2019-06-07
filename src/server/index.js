import fs from 'fs'
import debug from 'debug'
import { handlePlayer } from './controllers/handle_player'
import { handleRoom } from './controllers/handle_room'
import { checkUrl } from './controllers/handle_url'
import { initRoom } from './controllers/init_room'
import { initGame } from './controllers/init_game'
import { newPiece } from './controllers/handle_game'
import { getRoom, getPlayerBySocketId } from './controllers/tools'
import data from './data'

const logerror = debug('tetris:error')
const loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const { host, port } = params
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ?
    '/../../build/bundle.js' :
    '/../../index.html'
    fs.readFile(__dirname + file, (err, data) => {
      res.writeHead(200)
      res.end(data)

    })
  }
  app.on('request', handler)
  app.listen({ host, port }, () => {
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const initEngine = (io) => {
  io.on('connection', (socket) => {
    initRoom(socket)
    socket.emit('action', ({
      type: 'VIEW',
      view: 'Menus',
    }))
    loginfo('Socket connected: ', socket.id)
    socket.on('action', (action) => {
      checkUrl(action, socket)
      handlePlayer(action, socket)
      handleRoom(action, socket)
      initGame(action, socket)
      newPiece(action, socket)
    })
    socket.on('disconnecting', () => {
      const rooms = Object.keys(socket.rooms)
      const player = getPlayerBySocketId(rooms[0])
      if (player) {
        if (rooms[1]) {
          const room = getRoom(rooms[1])
          if (room) {
            const action = {
              type: 'server/LEAVE_ROOM',
              room: room,
              playerName: player.username,
              leader: player.leader,
            }
            handleRoom(action, socket)            
          }
          const indexRoom = data.listRoom.indexOf(rooms[1])
          if (index > -1) {
            data.listRoom.splace(indexRoom, 1)
          }
        }
        const index = data.listPlayer.indexOf(player)
        if (index > -1) {
          data.listPlayer.splice(index, 1)
        }
      }
    })
  })
}

export function create(params) {
  const promise = new Promise(resolve => {
    const app = require('http').createServer()
    initApp(app, params, () => {
      const io = require('socket.io')(app)
      const stop = (cb) => {
        io.close()
        app.close(() => {
          app.unref()
        })
        loginfo('Engine stopped.')
        cb()
      }

      initEngine(io, params)
      resolve({ stop })
    })
  })
  return promise
}

