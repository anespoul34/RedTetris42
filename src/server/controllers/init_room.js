import data from '../data'

export const initRoom = (socket) => {
	socket.emit('action', {
		type: 'SET_ROOM_LIST',
		listRoom: data.listRoom,
	})
}