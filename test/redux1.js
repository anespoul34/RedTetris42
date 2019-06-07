/* eslint-env node, mocha */
import { configureStore } from './helpers/server'
import { expect } from 'chai'
import rootReducer from '../src/client/reducers'
import { newLinesCollision } from '../src/client/reducers/game'
import { alert } from '../src/client/actions/alertAction'

const MESSAGE = 'message'

describe('Reducer alert', () => {
  it('message error', (done) => {
    const initialState = { game : {coucou: 'lol'}}
    const store = configureStore(rootReducer, null, initialState, {
      'ERROR_MESSAGE': ({ getState }) => {
        const state = getState()
        expect(state.alert.message).to.equal(MESSAGE)
        done()
      },
    })
    store.dispatch(alert(MESSAGE))
  })
})

const action = {
  lines: 4,
  boards: [
    {
      username: 'player',
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
        ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'],
        ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'],
        ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'],
      ],
    },
  ],
}

const state = {
  currentPiece: [
    [['J', 0, 0], ['J', 'J', 'J'], [0, 0, 0]],
    [[0, 'J', 'J'], [0, 'J', 0], [0, 'J', 0]],
    [[0, 0, 0], ['J', 'J', 'J'], [0, 0, 'J']],
    [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]],
  ],
  posX: 0,
  posY: 16,
  rotation: 1,
  username: 'player',
}

describe('Reducer game', () => {
  it('test newLinesCollision function', () => {
    expect(newLinesCollision(state, action)).to.equal(2)
    state.posY = 0
    expect(newLinesCollision(state, action)).to.equal(0)
  })
})

describe('Reducer room', () => {
  it('should handle initial state', () => {
    expect(
      rootReducer({}, {}).room
    ).to.deep.equal({
      roomName: '',
      maxPlayers: 1,
      mode: 'classic',
      listRoom: [],
    })
  })
  it('should handle SET_PLAYERS_NBR', () => {
    expect(
      rootReducer({}, {
        type: 'SET_PLAYERS_NBR',
        nbPlayers: 3,
      }).room
    ).to.deep.equal({
      roomName: '',
      maxPlayers: 1,
      nbPlayers: 3,
      mode: 'classic',
      listRoom: [],
    })
  })
  it('should handle SET_ROOM_NAME', () => {
    expect(
      rootReducer({}, {
        type: 'SET_ROOM_NAME',
        roomName: 'player',
      }).room
    ).to.deep.equal({
      roomName: 'player',
      maxPlayers: 1,
      mode: 'classic',
      listRoom: [],
    })
  })
  it('should handle SELECT_MAX_PLAYERS', () => {
    expect(
      rootReducer({}, {
        type: 'SELECT_MAX_PLAYERS',
        maxPlayers: 4,
      }).room
    ).to.deep.equal({
      roomName: '',
      maxPlayers: 4,
      mode: 'classic',
      listRoom: [],
    })
  })
  it('should handle SELECT_MODE', () => {
    expect(
      rootReducer({}, {
        type: 'SELECT_MODE',
        mode: 'supertetriminos',
      }).room
    ).to.deep.equal({
      roomName: '',
      maxPlayers: 1,
      mode: 'supertetriminos',
      listRoom: [],
    })
  })
  it('should handle SET_ROOM_LIST', () => {
    expect(
      rootReducer({}, {
        type: 'SET_ROOM_LIST',
        listRoom: ['room1', 'room2'],
      }).room
    ).to.deep.equal({
      roomName: '',
      maxPlayers: 1,
      mode: 'classic',
      listRoom: ['room1', 'room2'],
    })
  })
  it('should handle SET_NEW_LEADER', () => {
    expect(
      rootReducer({}, {
        type: 'SET_NEW_LEADER',
        activeRoom: { roomName: 'room1' },
        leaderName: 'player',
        nbPlayers: 3,
      }).room
    ).to.deep.equal({
      roomName: '',
      maxPlayers: 1,
      mode: 'classic',
      activeRoom: { roomName: 'room1' },
      leaderName: 'player',
      nbPlayers: 3,
      listRoom: [],
    })
  })
})
