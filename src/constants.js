 export const TURNS = {
    X: '✖️', // Jugador 1 (X)
    O: '⚪' // Jugador 2 (O)
  }
  // Creando un tablero vacío
  
 export const WINNER_COMBOS = [
    // Horizontales
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  
    // Verticales
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  
    // Diagonales
    [0, 4, 8],
    [2, 4, 6]
  ]