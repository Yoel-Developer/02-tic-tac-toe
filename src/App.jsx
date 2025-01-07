import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { checkEndGame } from "./logic/board.js";

function App() {
  
  const [board, SetBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  }

);

const [turn, setTurn] = useState(()=>{
  const turnFromStorage = window.localStorage.getItem('turn')
  return turnFromStorage ?? TURNS.X
}) 
//null es para que no haya ganador y false para que haya ganador
const [winner, setWinner] = useState(null)

const resetGame = () =>{
  SetBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)

  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}


const updateBoard = (index) => {
  if (board[index] || winner) return // Si la casilla ya está ocupada, no hacer nada
  const newBoard = [...board] // Copiando el tablero actual
  newBoard[index] = turn   // Actualizando el tablero con el valor del jugador actual
  SetBoard(newBoard) // Actualizando el estado del tablero
  // Cambiando el turno
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn)
  //Guardar aqui Partida
  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', newTurn)


  // Verificando si hay un ganador
  const newWinner = checkWinnerFrom(newBoard)
  if (newWinner) {
    confetti()
    setWinner(newWinner)
  } else if (checkEndGame(newBoard)){
      setWinner(false)  
    } // Empate
}

  return (
    <main className="board">
      <h1>Tick Tac Toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className="game">
    {

      board.map((square, index) => (
        <Square 
        key={index} 
        index={index}
        updateBoard={updateBoard}
        >
          {square}
        </Square>
      ))
    }
      </section>
      <section className="turn">

        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}</Square>

        <Square isSelected={turn === TURNS.O}
        >{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={ resetGame} winner={winner}/>
    </main>
  )
}

export default App
