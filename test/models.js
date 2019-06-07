/* eslint-env node, mocha */
import { expect } from 'chai'
import Game from '../src/server/models/Game'
import Piece from '../src/server/models/Piece'
import Player from '../src/server/models/Player'

const player = {
  leader: false,
  username: 'player',
  associatedRoom: '',
  currentPiece: 0,
  nextPiece: 1,
  socketId: '',
  malus: 0,
  score: 0,
  line: 0,
  level: 1,
  board: [],
  spectre: [],
  lose: false,
}

const square = [[['O', 'O'], ['O', 'O']]]

const gameTest = new Game('player', 'roomTest', 4, 'classic')

describe('========== MODELS ==========', () => {

  describe('- GAME -', () => {
    it('should addPlayer', () => {
      gameTest.addPlayer(player)
      expect(gameTest.listPlayer[0]).to.equal(player)
      expect(gameTest.nbPlayers).to.equal(1)
    })
    it('should clearGame', () => {
      gameTest.clearGame()
      expect(gameTest.listPlayer[0].currentPiece).to.equal(0)
      expect(gameTest.listPlayer[0].nextPiece).to.equal(1)
      expect(gameTest.listPlayer[0].malus).to.equal(0)
      expect(gameTest.listPlayer[0].score).to.equal(0)
      expect(gameTest.listPlayer[0].line).to.equal(0)
      expect(gameTest.listPlayer[0].level).to.equal(1)
      expect(gameTest.listPlayer[0].lose).to.equal(false)
    })
    it('should removePlayer', () => {
      gameTest.removePlayer(player)
      expect(gameTest.listPlayer).to.have.lengthOf(0)
      expect(gameTest.nbPlayers).to.equal(0)
    })
    it('should removePlayer undefined', () => {
      gameTest.removePlayer({})
      expect(gameTest.listPlayer).to.have.lengthOf(0)
      expect(gameTest.nbPlayers).to.equal(0)
    })
  })

  describe('- PIECE -', () => {
    it('should genrateRandomPiece', () => {
      const P = new Piece()
      const list = []
      const listSuper = []
      P.generateRandomPiece(list)
      expect(list).to.have.lengthOf(10)
      P.generateRandomSuperminos(listSuper)
      expect(listSuper).to.have.lengthOf(10)
    })
  })

  describe('- PLAYER -', () => {
    const player = new Player(true, 'playername')
    it('hasRoom', () => {
      expect(player.hasRoom(player)).to.equal(false)
      player.associatedRoom = 'roomTest'
      expect(player.hasRoom(player)).to.equal(true)
    })
    it('initBoard', () => {
      player.initBoard()
      expect(player.board).to.have.lengthOf(20)
    })
    it('isPossibleToPlace', () => {
      expect(player.isPossibleToPlace(square, 0, 0, 0)).to.equal(true)
      expect(player.isPossibleToPlace(square, 0, 0, -2)).to.equal(false)
    })
    it('fixPiece', () => {
      player.fixPiece(square, 18, 0, 0)
      expect(player.board[18][0]).to.equal('O')
    })
    it('darkenboard', () => {
      player.darkenBoard()
      expect(player.board[18][0]).to.equal('X')
    })
    it('setScore', () => {
      player.setScore(3)
      expect(player.score).to.equal(90)
      player.setScore(1)
      expect(player.score).to.equal(100)
    })
    it('checkLine', () => {
      player.fixPiece(square, 16, 0, 0)
      player.fixPiece(square, 16, 2, 0)
      player.fixPiece(square, 16, 4, 0)
      player.fixPiece(square, 16, 6, 0)
      player.fixPiece(square, 16, 8, 0)
      expect(player.checkLine()).to.have.lengthOf(2)
    })
    it('removeCompleteLine', () => {
      expect(player.removeCompleteLine()).to.equal(2)
    })
    it('addLines', () => {
      player.addLines(3)
      expect(player.board[18][0]).to.equal('X')
    })
  })
})