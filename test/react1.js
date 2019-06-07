/* eslint-env node, mocha */
import React from 'react'
import sinon from 'sinon'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'
import reducer from '../src/client/reducers'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Adversaries from '../src/client/components/Adversaries'
import Gameover from '../src/client/components/Gameover'
import JoinRoom from '../src/client/components/join_room'
import ListRooms from '../src/client/components/list_rooms'
import CreateRoom from '../src/client/components/create_room'
import Board from '../src/client/components/Board'
import { ConnectedPlayer, LobbyComponent } from '../src/client/components/lobby_component'
import params from '../params'

const socket = io(params.server.url)
const ioMiddleware = createSocketIoMiddleware(socket, 'server/')
const initialState = {}
const fakeListRoom = [
  { roomName: 'room1', nbPlayers: 1, maxPlayers: 4, leader: false },
  { roomName: 'room2', nbPlayers: 3, maxPlayers: 4, leader: true },
]

describe('======== COMPONENTS ========\n', () => {

  describe('< ListRooms />', () => {
    it('should render a li by room', () => {
      const wrapper = shallow(<ListRooms list={fakeListRoom} />)
      expect(wrapper.find('li')).to.have.length(2);
    })
    it('should render 2 span by room', () => {
      const wrapper = shallow(<ListRooms list={fakeListRoom} />)
      expect(wrapper.find('span')).to.have.length(4);
    })
    it('should active room on click', () => {
      const spyClick = sinon.spy();
      const wrapper = shallow(<ListRooms list={fakeListRoom} selectRoom={spyClick} />)
      wrapper.find('li').first().simulate('click')
      expect(spyClick.calledOnce).to.be.true
    })
    it('should render activeRoom selected', () => {
      const wrapper = shallow(<ListRooms activeRoom={fakeListRoom[1]} list={fakeListRoom} />)
      expect(wrapper.find('.select')).to.have.length(1);
      expect(wrapper.find('.no-select')).to.have.length(1);
    })
  })

  describe('< JoinRoom />', () => {
    it('should render a div', () => {
      const wrapper = shallow(<JoinRoom />)
      expect(wrapper.find('div')).to.have.length(8)
    })
    it('should render a title', () => {
      const wrapper = shallow(<JoinRoom />)
      expect(wrapper.find('h3')).to.have.length(1);
    })
    it('should render a list', () => {
      const wrapper = shallow(<JoinRoom listRoom={fakeListRoom} />)
      expect(wrapper.find('ListRooms')).to.have.length(1);
    })
    it('render without list', () => {
      const wrapper = shallow(<JoinRoom />)
      expect(wrapper.text()).to.equal('Join RoomEnter Room');
    })
    it('should render a list', () => {
      const wrapper = shallow(<JoinRoom listRoom={fakeListRoom} />)
      expect(wrapper.find('ListRooms').text()).to.equal('<ListRooms />');
    })
  })

  describe('< LobbyComponent />', () => {
    it('should render a div', () => {
      const wrapper = shallow(<LobbyComponent />)
      expect(wrapper.find('div')).to.have.length(8)
    })
    it('should render a title', () => {
      const wrapper = shallow(<LobbyComponent />)
      expect(wrapper.find('h3')).to.have.length(1)
    })
    it('should render a button wich quit onClick', () => {
      const spyClick = sinon.spy()
      const wrapper = shallow(<LobbyComponent leaveRoom={spyClick}/>)
      expect(wrapper.find('.lobbyButton')).to.have.length(1)
      wrapper.find('.lobbyButton').simulate('click')
      expect(spyClick.calledOnce).to.be.true
    })
    it('should render a ConnectedPlayer component', () => {
      const wrapper = shallow(<LobbyComponent />)
      expect(wrapper.find(ConnectedPlayer)).to.have.length(1)
    })
    it('should render a leader', () => {
      const wrapper = shallow(<LobbyComponent leader={true} />)
      expect(wrapper.find('.lobbyButton')).to.have.length(2)
    })
  })  

  describe('< ConnectedPlayer />', () => {
    it('should render a ul', () => {
      const wrapper = shallow(<ConnectedPlayer listPlayer={fakeListRoom} />)
      expect(wrapper.find('ul')).to.have.length(1)
    })
    it('should render a list with a span each', () => {
      const wrapper = shallow(<ConnectedPlayer listPlayer={fakeListRoom} />)
      expect(wrapper.find('li')).to.have.length(2)
      expect(wrapper.find('span')).to.have.length(2)
    })
    it('should render a leader', () => {
      const wrapper = shallow(<ConnectedPlayer listPlayer={fakeListRoom} />)
      expect(wrapper.find('.leader')).to.have.length(1)
    })
  })

  describe('< Adversaries />', () => {
    const fakeSpectres = [
      {
        username: 'MrTest',
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
      },
    ]
    it('should render 2 div if no spectres', () => {
      const wrapper = shallow(<Adversaries />)
      expect(wrapper.find('div')).to.have.length(2)
    })
    it('should render 4 div if one spectre', () => {
      const wrapper = shallow(<Adversaries spectres={fakeSpectres} />)
      expect(wrapper.find('div')).to.have.length(124)
    })
    it('should render a list of spectres', () => {
      const wrapper = shallow(<Adversaries spectres={fakeSpectres} />)
      expect(wrapper.find('li')).to.have.length(1)
      expect(wrapper.find('.line')).to.have.length(11)
    })
    it('should render one Z', () => {
      const wrapper = shallow(<Adversaries spectres={fakeSpectres} />)
      expect(wrapper.find('.Z')).to.have.length(1)
    })
  }) 
  describe('< Gameover />', () => {
    const props = {
      pending: false,
      leader: true,
      listPlayers: [
        {
          lose: true,
          username: 'Player1',
          score: 0,
        },
        {
          lose: false,
          username: 'Player2',
          score: 0,
        },
      ],
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
      ]
    }
    it('should render div', () => {
      const wrapper = shallow(<Gameover {...props} />)
      expect(wrapper.find('div')).to.have.length(125)
    })
    it('should render rank', () => {
      const wrapper = shallow(<Gameover {...props} />)
      expect(wrapper.find('li')).to.have.length(2)
    })
    it('should render winner', () => {
      const wrapper = shallow(<Gameover {...props} />)
      expect(wrapper.find('li').first().text()).to.be.equal('Player2')
    })
    it('should render no winner', () => {
      props.listPlayers.splice(1, 1)
      const wrapper = shallow(<Gameover {...props} />)
      expect(wrapper.find('li').first().text()).to.be.equal('Player1')
    })
    it('should render "play again" button', () => {
      const wrapper = shallow(<Gameover {...props} />)
      expect(wrapper.find('#end')).to.have.length(1)
    })
    it('should render pending', () => {
      props.pending = true
      const wrapper = shallow(<Gameover {...props} />)
      expect(wrapper.find('#end')).to.have.length(0)
    })
  }) 
  
  describe('< CreateRoom />', () => {
    it('should render a title', () => {
      const wrapper = shallow(<CreateRoom />)
      expect(wrapper.find('h3')).to.have.length(1)
    })
    it('should render an input wich setName onChange', () => {
      const spyClick = sinon.spy()
      const event = { target: { username: 'test' } }
      const wrapper = shallow(<CreateRoom setRoomName={spyClick}/>)
      expect(wrapper.find('input')).to.have.length(1)
      wrapper.find('input').simulate('change', event)
      expect(spyClick.calledOnce).to.be.true
    })
    it('should render 1 select and 3 no-select div wich selectMaxPlayers onClick', () => {
      const spyClick = sinon.spy()
      const wrapper = shallow(<CreateRoom maxPlayers={1} selectMaxPlayers={spyClick} />)
      expect(wrapper.find('.playersSelection .no-select')).to.have.length(3)
      expect(wrapper.find('.playersSelection .select')).to.have.length(1)
      wrapper.find('.playersSelection .no-select').first().simulate('click')
      expect(spyClick.calledOnce).to.be.true
      wrapper.find('.playersSelection .select').first().simulate('click')
      expect(spyClick.calledOnce).to.be.false
    })
    it('should render 1 select and 3 no-select div wich modeSelection onClick', () => {
      const spyClick = sinon.spy()
      const wrapper = shallow(<CreateRoom mode={'classic'} selectMode={spyClick} />)
      expect(wrapper.find('.modeSelection .no-select')).to.have.length(3)
      expect(wrapper.find('.modeSelection .select')).to.have.length(1)
      wrapper.find('.modeSelection .no-select').first().simulate('click')
      expect(spyClick.calledOnce).to.be.true
      wrapper.find('.modeSelection .select').first().simulate('click')
      expect(spyClick.calledOnce).to.be.false
    })
    it('should render a button wich setRoom onClick', () => {
      const spyClick = sinon.spy()
      const wrapper = shallow(<CreateRoom setRoom={spyClick} />)
      expect(wrapper.find('#setRoomButton')).to.have.length(1)
      wrapper.find('#setRoomButton').simulate('click')
      expect(spyClick.calledOnce).to.be.true
    })
    it('should render an error {message}', () => {
      const wrapper = shallow(<CreateRoom message='error' />)
     expect(wrapper.find('#error').text()).to.equal('error');
    })
  })

  describe('< Board />', () => {
    it('Simple board render', () => {
      const wrapper = shallow(<Board />)
      expect(wrapper.find('div')).to.have.length(1)
    })
    it('Real board render', () => {

      const fakeBoard = {
        username: 'fake',
        board: [
          [0,0,0,0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0,0,0,0], 
          [0,0,0,0,0,0,0,0,0,0]],
        line: 0,
        level: 0,
        score: 0,
      }
      const fakePiece = [ 
        [[0, 0, 0], ['I', 'I', 'I'], [0, 0, 0]], 
        [[0, 'I', 0], [0, 'I', 0], [0, 'I', 0]], 
      ]

      const wrapper = shallow(<Board mode='invisible' rotation={0} posX={1} posY={1} currentPiece={fakePiece} myBoard={fakeBoard}/>)
      expect(wrapper.find('div')).to.have.length(89)
    })
  })
})
