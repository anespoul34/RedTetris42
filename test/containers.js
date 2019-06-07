import React from 'react'
import sinon from 'sinon'
import chai from 'chai'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'
import { shallow } from 'enzyme'
import { App, View } from '../src/client/containers/App'
import { mapStateToProps as AppState } from '../src/client/containers/App'
import Lobby from '../src/client/containers/Lobby'
import { mapDispatchToProps as LobbyDispatch } from '../src/client/containers/Lobby'
import Settings from '../src/client/containers/Settings'
import Tetris from '../src/client/containers/Tetris'
import Menus from '../src/client/containers/Menus'
import { LobbyComponent } from '../src/client/components/lobby_component'
import { storeStateMiddleWare } from '../src/client/middleware/storeStateMiddleWare'
import reducer from '../src/client/reducers'
import params from '../params'
import CreateRoom from '../src/client/components/create_room'
import JoinRoom from '../src/client/components/join_room'

const socket = io(params.server.url)
const ioMiddleware = createSocketIoMiddleware(socket, 'server/')

const initialState = {}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(ioMiddleware, thunk, createLogger())
)

const expect = chai.expect
const assert = chai.assert

describe('======== APP CONTAINER ========\n', () => {
  describe('< App />', () => {
    it('should render a 2 div, an img and a View', () => {
      const wrapper = shallow(<App />)
      expect(wrapper.find('div')).to.have.length(2)
      expect(wrapper.find('img')).to.have.length(1)
      expect(wrapper.find(View)).to.have.length(1)
    })
    it('should render a View', () => {
      const wrapper = shallow(<App view="view" />)
      expect(wrapper.find(View)).to.have.length(1)
    })
  })

  describe('< View />', () => {
    it('should render a Lobby', () => {
      const wrapper = shallow(<View step="lobby"/>)
      expect(wrapper.find(Lobby)).to.have.length(1)
    })
    it('should render a Settings', () => {
      const wrapper = shallow(<View step="settings"/>)
      expect(wrapper.find(Settings)).to.have.length(1)
    })
    it('should render a Tetris', () => {
      const wrapper = shallow(<View step="tetris"/>)
      expect(wrapper.find(Tetris)).to.have.length(1)
    })
    it('should render a Menu', () => {
      const wrapper = shallow(<View />)
      expect(wrapper.find(Menus)).to.have.length(1)
    })
  })

  describe('App mapStateToProps', () => {
    const res = AppState({view: { view: 'salut' }})
    it ('function should return an object', () => {
      assert.isDefined(res)
      assert.isObject(res)
    })
    it ('message should be a string', () => {
      assert.isDefined(res.view)
      assert.isString(res.view)
      assert.equal(res.view, 'salut')
    })
  })
})

describe('======== LOBBY CONTAINER ========\n', () => {
  describe('< Lobby />', () => {
    it('should render a LobbyComponent', () => {
      const wrapper = shallow(<Lobby store={store} />).dive()
      expect(wrapper.length).to.be.equal(1)
      expect(wrapper.find(LobbyComponent)).to.have.length(1)
    })
  })
})

describe('======== MENUS CONTAINER ========\n', () => {

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(ioMiddleware, thunk, createLogger())
  )
  const store2 = createStore(
    reducer,
    {
      room: {
        listRoom: [[0], [1], [2]],
      },
    },
    applyMiddleware(ioMiddleware, thunk, createLogger())
    ) 
  describe('< Menus />', () => {
    it('should render a Menu', () => {
      const wrapper = shallow(<Menus store={store}/>)
      expect(wrapper.length).to.be.equal(1)
    })
    it('should render 9 div, 4 span and 1 input', () => {
      const wrapper = shallow(<Menus store={store}/>).dive()
      expect(wrapper.find('div')).to.have.length(9)
      expect(wrapper.find('span')).to.have.length(4)
      expect(wrapper.find('input')).to.have.length(1)
    })
    it('should render 9 div, 4 span and 1 input', () => {
      const wrapper2 = shallow(<Menus store={store2}/>).dive()
      expect(wrapper2.find('div')).to.have.length(9)
      expect(wrapper2.find('span')).to.have.length(4)
      expect(wrapper2.find('input')).to.have.length(1)
    })
  })
})

describe('======== SETTINGS CONTAINER ========\n', () => {

  describe('< Settings />', () => {
    it('should render a Menu', () => {
      const wrapper = shallow(<Settings store={store}/>)
      expect(wrapper.length).to.be.equal(1)
    })
    it('should render CreateRoom', () => {
      const test = createStore(
        reducer,
        {newplayer: {leader:true}},
        applyMiddleware(ioMiddleware, thunk, createLogger())
      )
      const wrapper = shallow(<Settings store={test} />).dive()
      expect(wrapper.find(CreateRoom)).to.have.length(1)
    })
    it('should render JoinRoom', () => {
      const wrapper = shallow(<Settings store={store} />).dive()
      expect(wrapper.find(JoinRoom)).to.have.length(1)
    })
  })
})

describe('======== TETRIS CONTAINER ========\n', () => {

  const fakeBoard = [{
    username: 'fake',
    board: [[0,0,0], [0,0,0]],
    line: 0,
    level: 0,
    score: 0,
  }]
  const fakeBoard2 = [{
    username: 'fake',
    board: [[0,0,0], [0,0,0]],
    line: 0,
    level: 11,
    score: 0,
  }]

  describe('< Tetris />', () => {
    it('should render a Tetris', () => {
      const wrapper = shallow(<Tetris store={store} />)
      expect(wrapper.length).to.be.equal(1)
    })
    it('should render divS and #game', () => {

      const test = createStore(
        reducer,
        { 
          game: { 
            boards: fakeBoard,
            username: 'fake',
            nextPiece: [[['I','I','I'], ['I', 'I', 'I']]],
          },
        },
        applyMiddleware(ioMiddleware, thunk, createLogger())
        )

      const wrapper = shallow(<Tetris store={test} />).dive()
      expect(wrapper.find('div')).to.have.length(26)
      expect(wrapper.find('#game')).to.have.length(1)

      const test2 = createStore(
        reducer,
        { 
          game: { 
            boards: fakeBoard2,
            username: 'fake',
            nextPiece: [[['I','I','I'], ['I', 'I', 'I'], [0,0,0], [0,0,0 ]]],
            winner: true,
          },
        },
        applyMiddleware(ioMiddleware, thunk, createLogger())
        )

      const wrapper2 = shallow(<Tetris store={test2} />).dive()
      expect(wrapper2.find('div')).to.have.length(30)
      expect(wrapper2.find('#game')).to.have.length(1)
    })
  })
})
