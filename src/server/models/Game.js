class Game {

  constructor(leaderName, roomName, maxPlayers, mode) {
    this.leaderName = leaderName
    this.roomName = roomName
    this.listPlayer = []
    this.nbPlayers = 0
    this.maxPlayers = maxPlayers
    this.mode = mode
    this.listPiece = []
    this.full = false
    this.start = false
    this.time = null
  }

  addPlayer(player) {
    this.listPlayer.push(player)
    this.nbPlayers = this.nbPlayers + 1
  }
 
  removePlayer(player) {
    const index = this.listPlayer.indexOf(player)
    if (index > -1) {
      this.nbPlayers = this.nbPlayers - 1
      this.listPlayer.splice(index, 1)
    }
  }

  clearGame() {
    this.listPiece = []
    this.listPlayer.map(player => {
      player.currentPiece = 0
      player.nextPiece = 1
      player.malus = 0
      player.score = 0
      player.line = 0
      player.level = 1
      player.board = []
      player.spectre = []
      player.lose = false
    })
  }

}

export default Game