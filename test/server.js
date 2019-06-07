/* eslint-env node, mocha */
import chai from 'chai'
import { startServer, configureStore } from './helpers/server'
import { disconnect } from '../src/server/index'
import reducer from '../src/client/reducers'
import { createNewUser, handlePlayer } from '../src/server/controllers/handle_player'
import { checkUrl } from '../src/server/controllers/handle_url'
import { initRoom } from '../src/server/controllers/init_room'
import { initGame } from '../src/server/controllers/init_game'
import { checkPosY } from '../src/client/actions/gameActions'
import * as roomAction from '../src/client/actions/roomActions'
import io from 'socket.io-client'
import params from '../params'
import data from '../src/server/data'
import Game from '../src/server/models/Game'
import Player from '../src/server/models/Player'
import { create } from '../src/server/index'

chai.should()
const assert = chai.assert

const initialState = {}
const MAX_PLAYERS = 4

const newRoom = new Game('Jack', 'Room', MAX_PLAYERS, 'classic')
const newRoom2 = new Game('SupermiJack', 'Room2', MAX_PLAYERS, 'superminos')
const newPlayer = new Player(true, 'Jack')
const newPlayer2 = new Player(true, 'SupermiJack')
const Player3 = new Player(false, 'Raymond')
const Jason = new Player(false, 'Jason')
const i = 4

Jason.board = []

newPlayer.associatedRoom = newRoom.roomName
newPlayer.board = [
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
]
newPlayer2.associatedRoom = newRoom2.roomName
newPlayer2.board = [
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
]
Player3.associatedRoom = newRoom.roomName
Player3.board = [
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
]
data.listPlayer.push(newPlayer)
data.listPlayer.push(newPlayer2)
data.listPlayer.push(Player3)
data.listPlayer.push(Jason)
newRoom.addPlayer(newPlayer)
newRoom.addPlayer(Player3)
newRoom2.addPlayer(newPlayer2)
data.listRoom.push(newRoom)
data.listRoom.push(newRoom2)

describe('\n======== SERVER ========\n', () => {

  describe('initRoom', () => {
    it('should init roomList', (done) => {
      const socket = io(params.server.url)
      initRoom(socket)
      assert.isDefined(data.listRoom)
      done()
    })
  })

  describe('CreateNewUser', () => {
    it('should not create a new user', (done) => {
      const socket = io(params.server.url)
      const action = {
        type: 'server/NEW_PLAYER',
        username: 'Jack',
      }
      createNewUser(action, socket, false)
      assert.isUndefined(data.listPlayer[i])
      done()
    })
    it('should not create a new user', () => {
      const socket = io(params.server.url)
      const action = {
        type: 'server/NEW_PLAYER',
        username: '',
      }
      createNewUser(action, socket, true)
      assert.isUndefined(data.listPlayer[i])
    })
    it('should create a new user', (done) => {
      const socket = io(params.server.url)
      const action = {
        type: 'server/NEW_PLAYER',
        username: 'Jack the 2nd',
      }
      createNewUser(action, socket, false)
      assert.equal(data.listPlayer[i].username, 'Jack the 2nd')
      done()
    })
  })

  describe('handlePlayer', () => {
    it('should not handle player', (done) => {
      const socket = io(params.server.url)
      const action = { type: 'FAKE', username: 'Jack4' }
      handlePlayer(action, socket)
      assert.isUndefined(data.listPlayer[i + 1])
      done()
    })
    it('should handle player', (done) => {
      const socket = io(params.server.url)
      const action = {
        type: 'server/NEW_PLAYER',
        username: 'Jack the 3rd',
        leader: true,
      }
      handlePlayer(action, socket)
      assert.equal(data.listPlayer[i + 1].username, 'Jack the 3rd')
      done()
    })
  })

  describe('handle_room', () => {
    let tetrisServer

    before(cb => startServer(params.server, (err, server) => {
      tetrisServer = server
      cb()
    }))
    after((done) => { tetrisServer.stop(done) })

    it('should VIEW', (done) => {
      const socket = io(params.server.url)
      const store = configureStore(reducer, socket, {}, {
        'VIEW': () => {
          done()
        },
      })
      store.dispatch(roomAction.setRoom('', '', 4, 1, 'classic'))
    })
    it('should SET_ROOM', (done) => {
      const socket = io(params.server.url)
      const store = configureStore(reducer, socket, initialState, {
        'SET_ROOM': ({ getState }) => {
          assert.equal(getState().room.activeRoom.leaderName, 'Jack')
          assert.equal(getState().room.roomName, 'RoomX')
          assert.equal(getState().room.maxPlayers, 4)
          assert.equal(getState().room.nbPlayers, 1)
          assert.equal(getState().room.mode, 'classic')
          done()
        },
      })
      store.dispatch(roomAction.setRoom('Jack', 'RoomX', 4, 1, 'classic'))
    })
    it('should SET_ROOM_LIST', (done) => {
      const socket = io(params.server.url)
      const store = configureStore(reducer, socket, initialState, {
        'SET_ROOM_LIST': () => {
          done()
        },
      })
      store.dispatch(roomAction.enterRoom(data.listRoom[0], 'Jason'))
    })
    it('should return error message', (done) => {
      const socket = io(params.server.url)
      newRoom2.nbPlayers = 4
      const store = configureStore(reducer, socket, initialState, {
        'ERROR_MESSAGE': () => {
          done()
        },
      })
      store.dispatch(roomAction.enterRoom(newRoom2, 'Jason'))
    })
    it('should SET_NEW_LEADER', (done) => {
      const socket = io(params.server.url)
      const store = configureStore(reducer, socket, initialState, {
        'NEW_PLAYER': () => {
          done()
        },
      })
      store.dispatch(roomAction.leaveRoom(data.listRoom[0], 'Raymond', false))
    })
  })

  describe('checkURL', () => {
    let tetrisServer

    before(cb => startServer(params.server, (err, server) => {
      tetrisServer = server
      cb()
    }))
    after((done) => { tetrisServer.stop(done) })

    it('should not create a new user and a new room', () => {
      const socket = io(params.server.url)
      const action = {
        type: 'server/CHECK_URL',
        roomName: '',
        username: 'Jack the 4th',
        url: true,
        leader: false,
        nbPlayers: 1,
        maxPlayer: 4,
      }
      checkUrl(action, socket)
    })
    it('should not create a new user and a new room 2nd case', () => {
      const socket = io(params.server.url)
      const action = {
        type: 'server/CHECK_URL',
        roomName: 'blabla',
        username: '',
        url: true,
        leader: false,
        nbPlayers: 1,
        maxPlayer: 4,
      }
      checkUrl(action, socket)
    })
    it('should not create a new user and a new room 3rd case', () => {
      const socket = io(params.server.url)
      const action = {
        type: 'server/CHECK_URL',
        roomName: 'test',
        username: 'Jack',
        url: true,
        leader: false,
        nbPlayers: 1,
        maxPlayer: 4,
      }
      checkUrl(action, socket)
    })
    it('should not create a new user and a new room 4th case', () => {
      const socket = io(params.server.url)
      const action = {
        type: 'server/CHECK_URL',
        roomName: 'Room',
        username: 'Jack',
        url: true,
        leader: false,
        nbPlayers: 1,
        maxPlayer: 4,
      }
      checkUrl(action, socket)
    })
    it('should joinRoom', (done) => {
      const socket = io(params.server.url)
      const store = configureStore(reducer, socket, initialState, {
        'SET_ROOM': () => {
          done()
        },
      })
      store.dispatch(roomAction.checkUrl('#Room[John]'))
    })
  })

  describe('initGame', () => {
    it('should init Superminos Game', (done) => {
      const socket = io(params.server.url)
      const action = {
        type: 'server/INIT_GAME',
        playerName: 'SupermiJack',
        room: {
          roomName: 'Room2',
          mode: 'superminos',
        },
      }
      initGame(action, socket)
      assert.equal(data.listRoom[1].mode, 'superminos')
      done()
    })
    it('should not init game', (done) => {
      const socket = io(params.server.url)
      const action = { type: 'FAKE' }
      initGame(action, socket)
      done()
    })
  })

  describe('newPiece', () => {
    let tetrisServer

    before(cb => startServer(params.server, (err, server) => {
      tetrisServer = server
      cb()
    }))
    after((done) => { tetrisServer.stop(done) })

    const playerTest = data.listPlayer[0]
    const roomTest = data.listRoom[0]
    const fakeState = {
      game: {
        boards: [{
          username: playerTest.username,
          board: playerTest.board,
        }],
        currentPiece: [[['O', 'O'], ['O', 'O']]],
        lockKey: false,
        posX: 0,
        posY: 18,
        rotation: 0,
        username: playerTest.username,
      },
      room: {
        roomName: roomTest.roomName,
      },
    }

    it('should SET_BOARD', (done) => {
      const socket = io(params.server.url)
      const store = configureStore(reducer, socket, fakeState, {
        'SET_BOARD': () => {
          done()
        },
      })
      store.dispatch(checkPosY())
    })
    it('should SET_LOSE', (done) => {
      const socket = io(params.server.url)
      const store = configureStore(reducer, socket, fakeState, {
        'SET_LOSE': () => {
          done()
        },
      })
      store.dispatch(checkPosY())
    })
  })
})
