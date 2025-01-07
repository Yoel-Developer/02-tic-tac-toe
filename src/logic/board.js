 import { WINNER_COMBOS } from '../constants'
 export const checkWinnerFrom = (boardToCheck) => {
  // Recorriendo todas las combinaciones ganadoras
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] && 
      boardToCheck[a] === boardToCheck[c]
    ){
      return boardToCheck[a]; // Devolviendo el jugador que ganó x u o
    }
  }
  return null // Si no hay ganador
}

export const checkEndGame = (newBoard) => {
  //revisamos si hay un empate
  //sino hay mas casillas vacias en el tablero
  return newBoard.every((square) => square !== null)
}


