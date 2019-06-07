class Player {

  constructor(leader, username) {
    this.leader = leader
    this.username = username
    this.associatedRoom = ''
    this.currentPiece = 0
    this.nextPiece = 1
    this.socketId = ''
    this.malus = 0
    this.score = 0
    this.line = 0
    this.level = 1
    this.board = []
    this.spectre = []
    this.lose = false
  }

  hasRoom() {
    return (this.associatedRoom !== '')
  }

  initBoard() {
    let i = -1
    while (++i < 20) {
      let y = -1
      this.board.push([])
      while (++y < 10) {
        this.board[i].push(0)
      }
    }
  }

  isPossibleToPlace(piece, rotation, posX, posY) {
    let y = -1
    while (++y < piece[rotation].length) {
      let x = -1
      while (++x < piece[rotation][y].length) {
        const box = piece[rotation][y][x]
        if (box) {
          if (posY + y < 0 || this.board[posY + y][posX + x])
            return false
        }
      }
    }
    return true
  }

  darkenBoard() {
    this.board.map((line, y) => {
      this.board[y].map((box, x) => {
        if (box) {
          this.board[y][x] = 'X'
        }
      })
    })
  }

  fixPiece(piece, posY, posX, rotation) {
    piece[rotation].map((line, i) => {
      piece[rotation][i].map((box, j) => {
        if (box && this.board.length > i + posY && posY + i >= 0) {
          this.board[i + posY][j + posX] = box
        }
      })
    })
  }

  setScore(nbLine) {
    const score = [0, 10, 30, 90, 270]
    this.score += score[nbLine]
  }

  removeCompleteLine() {
    const toDelete = this.checkLine()
    this.setScore(toDelete.length)
    toDelete.map(line => {
      this.board.splice(line, 1)
      this.board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    })
    this.line = this.line + toDelete.length
    return (toDelete.length)
  }

  checkLine() {
    return this.board.map((line, y) => {
      const index = line.findIndex(box => box === 0)
      if (index === -1) {
        const index2 = line.findIndex(box => box === 'X')
        if (index2 === -1) {
          return y
        }
      }
      return -1
    }).filter(line => line !== -1)
  }

  addLines(lines) {
    while (lines--) {
      this.board.push(['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'])
      const index = this.board[lines].findIndex((box) => {
        if (box) {
          return true
        }
      })
      this.board.splice(lines, 1)
      if (index !== -1) {
        return false
      }
    }
    return true
  }

}

export default Player
