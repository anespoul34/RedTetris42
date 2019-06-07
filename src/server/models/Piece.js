import { tetriminos, superminos } from '../constants/tetriminos'
const NB_TETRIMINOS = 7

class Piece {

  constructor() {
  }

  generateRandomPiece(list) {
    let i = -1;
    while (++i < 10) {
      list.push(tetriminos[Math.floor(Math.random() * NB_TETRIMINOS)])
    }
  }

  generateRandomSuperminos(list) {
    let i = -1;
    while (++i < 10) {
      list.push(superminos[Math.floor(Math.random() * NB_TETRIMINOS)])
    }
  }

}

export default Piece
