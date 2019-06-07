/* eslint-env node, mocha */
import chai, { expect } from 'chai'
import { alert } from '../src/client/actions/alertAction'
import { setNewPlayer, setUserName } from '../src/client/actions/playerActions'
import * as room from '../src/client/actions/roomActions'
import * as game from '../src/client/actions/gameActions'
import { setView } from '../src/client/actions/viewActions'
import { configureStore } from './helpers/server'
import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'
import reducer from '../src/client/reducers'
import params from '../params'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const assert = chai.assert
const initialState = {}
const socket = io(params.server.url)
const ioMiddleware = createSocketIoMiddleware(socket, 'server/')


  const fakeBoard = [{
    username: 'fake',
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 'I'],
      ],
    line: 0,
    level: 0,
    score: 0,
  }]

chai.should()

describe('\n======== ACTIONS ========\n', () => {

  describe('\n======== INDEX URL ACTIONS ========\n', () => {
    describe('Check url', () => {
      it('function should return nothing', () => {
        expect(room.checkUrl()).to.deep.equal({ type: '' })
        expect(room.checkUrl('')).to.deep.equal({ type: '' })
      })
      it('function should return object', () => {
        expect(room.checkUrl('#room[playername]')).to.be.a('object')
      })
    })
  })

	describe('\n======== ERROR ACTIONS ========\n', () => {
		describe('Error Message', () => {
			const res = alert('message')
			const statement = {
				type: 'ERROR_MESSAGE',
				message: 'message'
			}
			it ('function should return an object', () => {

				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
			it ('message should be a string', () => {
				assert.isDefined(res.message)
				assert.isString(res.message)
				assert.equal(res.message, 'message')
			})
		})	
	})

	describe('\n======== PLAYER ACTIONS ========\n', () => {
		describe('setNewPlayer', () => {
			const res = setNewPlayer(true, 'username')
			const statement = {
				type: 'server/NEW_PLAYER',
		  		leader: true,
		  		username: 'username',
			}
			it ('function should return an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
			it ('leader should be a boolean', () => {
				assert.isDefined(res.leader)
				assert.isBoolean(res.leader)
				assert.equal(res.leader, true)
			})
			it ('username should be a string', () => {
				assert.isDefined(res.username)
				assert.isString(res.username)
				assert.equal(res.username, 'username')
			})
		})

		describe ('setUserName', () => {
			const res = setUserName('username')
			const statement = {
			  type: 'SET_USER_NAME',
			  username: 'username',
			}
			it ('function should return an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
			it ('username should be a string', () => {
				assert.isDefined(res.username)
				assert.isString(res.username)
				assert.equal(res.username, 'username')
			})
		})	
	})

	describe('\n======== ROOM ACTIONS ========\n', () => {
		describe ('setRoom', () => {
			const res = room.setRoom('username', 'roomName', 4, 1, 'classic')
			const statement = {
				type: 'server/SET_ROOM',
				username: 'username',
				roomName: 'roomName',
				maxPlayers: 4,
				nbPlayers: 1,
				mode: 'classic',
			}
			it ('function should return an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
			it ('username should be a string', () => {
				assert.isDefined(res.username)
				assert.isString(res.username)
				assert.equal(res.username, 'username')
			})
			it ('roomName should be a string', () => {
				assert.isDefined(res.roomName)
				assert.isString(res.roomName)
				assert.equal(res.roomName, 'roomName')
			})
			it ('maxPlayers should be a number', () => {
				assert.isDefined(res.maxPlayers)
				assert.isNumber(res.maxPlayers)
				assert.equal(res.maxPlayers, 4)
			})
			it ('nbPlayers should be a number', () => {
				assert.isDefined(res.nbPlayers)
				assert.isNumber(res.nbPlayers)
				assert.equal(res.nbPlayers, 1)
			})
		})

		describe ('setPlayersNbr', () => {
			const res = room.setPlayersNbr(3)
			const statement = {
				type: "server/SET_PLAYERS_NBR",
		    	nbPlayers: 3,
			}
			it ('function should return an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
			it ('nbPlayers should be a number', () => {
				assert.isDefined(res.nbPlayers)
				assert.isNumber(res.nbPlayers)
				assert.equal(res.nbPlayers, 3)
			})
		})

		describe ('enterRoom', () => {
			const res = room.enterRoom({username: 'username', roomName: 'roomName', maxPlayers: 4, nbPlayers: 1}, 'username')
			const statement = {
			    type: "server/ENTER_ROOM",
			    activeRoom: {username: 'username', roomName: 'roomName', maxPlayers: 4, nbPlayers: 1},
			    username: 'username',
		    }
			it ('function should return an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
			it ('activeRoom should be an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res.activeRoom, {username: 'username', roomName: 'roomName', maxPlayers: 4, nbPlayers: 1})
			})
		})

		describe('leaveRoom', () => {
			const res = room.leaveRoom('room', 'name', true)
			const statement = {
				type: "server/LEAVE_ROOM",
				room: 'room',
				playerName: 'name',
				leader: true,
			}
			it ('function should return an object with leader = true', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
			const res2 = room.leaveRoom('room', 'name', false)
			const statement2 = {
				type: "server/LEAVE_ROOM",
				room: 'room',
				playerName: 'name',
				leader: false,
			}
			it ('function should return an object with leader = false', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
		}) 

		describe('initGame', () => {
			const res = room.initGame('room', 'playerName')
			const statement = {
				type: "server/INIT_GAME",
				room: 'room',
				playerName: 'playerName',
			}
			it ('function should return an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
		})

		describe ('selectRoom', () => {
			const res = room.selectRoom({leaderName: 'leaderName', roomName: 'roomName', maxPlayers: 4, nbPlayers: 1})
			const statement = {
			    type: "SELECT_ROOM",
			    activeRoom: {leaderName: 'leaderName', roomName: 'roomName', maxPlayers: 4, nbPlayers: 1},
		    }
			it ('function should return an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
			it ('activeRoom should be an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res.activeRoom, {leaderName: 'leaderName', roomName: 'roomName', maxPlayers: 4, nbPlayers: 1})
			})
		})

		describe ('selectMaxPlayers', () => {
			const res = room.selectMaxPlayers(3)
			const statement = {
				type: "SELECT_MAX_PLAYERS",
		    	maxPlayers: 3,
			}
			it ('function should return an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
			it ('maxPlayers should be a number', () => {
				assert.isDefined(res.maxPlayers)
				assert.isNumber(res.maxPlayers)
				assert.equal(res.maxPlayers, 3)
			})
		})

		describe('selectMode', () => {
			const res = room.selectMode('classic')
			const statement = {
				type: "SELECT_MODE",
				mode: 'classic',
			}
			it ('function should return an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})			
		})		

		describe ('setRoomName', () => {
			const res = room.setRoomName('roomName')
			const statement = {
				type: "SET_ROOM_NAME",
		    	roomName: 'roomName',
			}	
			it ('function should return an object', () => {
				assert.isDefined(res)
				assert.isObject(res)
				assert.deepEqual(res, statement)
			})
			it ('roomName should be a string', () => {
				assert.isDefined(res.roomName)
				assert.isString(res.roomName)
				assert.equal(res.roomName, 'roomName')
			})
		})

		describe('\n======== VIEW ACTIONS ========\n', () => {

			describe ('setView', () => {
				const res = setView('settings')
				const statement = {
				  	type: 'server/VIEW',
				  	view: 'settings',		
				}
				it ('function should return an object', () => {
					assert.isDefined(res)
					assert.isObject(res)
					assert.deepEqual(res, statement)
				})
				it ('view should be a string', () => {
					assert.isDefined(res.view)
					assert.isString(res.view)
					assert.equal(res.view, 'settings')
				})
			})			
		})
	})

	describe('\n======== GAME ACTIONS ========\n', () => {
	
		describe('setIncrement', () => {

			it ('should return SET_INCREMENT', (done) => {
				const store = configureStore(reducer, null, initialState, {
					SET_INCREMENT: ({dispatch, getState}) => {
						const state = getState().game
						done()
					}
				})
				store.dispatch(game.setIncrement())
			})
		})

		describe('clearIncrement', () => {
			it ('should return an object', () => {
				const res = game.clearIncrement()
				assert.isObject(res)
			})
		})

		describe('spaceBar', () => {
			it ('should return SPACE_BAR', (done) => {
				const store = configureStore(reducer, null, initialState, {
					SPACE_BAR: ({dispatch, getState}) => {
						const state = getState().game
						done()
					}
				})
				store.dispatch(game.spaceBar())
			})
		})

		describe('setX', () => {
			it ('should return an object', () => {
				const res = game.setX(1)
				const res2 = game.setX(-1)
				assert.isObject(res)
				assert.isObject(res2)
			})
		})

		describe('setY', () => {
			it ('should return an object', () => {
				const res = game.setY()
				assert.isObject(res)
			})
		})

		describe('checkPosY', () => {
			it ('should return SET_Y', (done) => {
				const store = configureStore(reducer, null, initialState, {
					SET_Y: ({dispatch, getState}) => {
						const state = getState().game
						done()
					}
				})
				store.dispatch(game.checkPosY(1))
			})
		})

		describe('checkRotation', () => {
			it ('should return an object', () => {
				const res = game.checkRotation()
				assert.isObject(res)
			})
		})

		describe('checkPosX', () => {

			it ('should return an object', () => {
				const res = game.checkPosX(-1)
				const res2 = game.checkPosX(1)
				assert.isObject(res)
				assert.isObject(res2)
			})
		})
	})
})




