import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSocketIoMiddleware from 'redux-socket.io'
import createLogger from 'redux-logger'
import io from 'socket.io-client'
import reducer from './reducers'
import params from '../../params'

const socket = io(params.server.url)
const ioMiddleware = createSocketIoMiddleware(socket, 'server/')
const initialState = {}

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(ioMiddleware, thunk, createLogger())
)

