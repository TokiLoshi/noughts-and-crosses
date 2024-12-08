import { useEffect } from 'react'
import useGameStore from '../Store'
import Square from './Square'
import { Html } from '@react-three/drei'

export default function Board({ rows = 3 }) {
  const [squares, setSquares] = useGameStore((state) => [state.squares, state.setSquares])
  const [xIsNext, setXIsNext] = useGameStore((state) => [state.xIsNext, state.setXIsNext])
  const restart = useGameStore((state) => state.restart)

  const positions = []
  let x = -1
  let y = 1
  let z = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      positions.push([x, y, z])
      x += 1.1
    }
    y -= 1.1
    x = -1
  }

  const winner = calculateWinner(squares)
  const turns = calculateTurns(squares)
  const player = xIsNext ? 'X' : '0'
  const status = calculateStatus(winner, turns, player)

  const handleClick = (index) => {
    if (squares[index] || winner) return
    const nextSquares = squares.slice()
    nextSquares[index] = player
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <>
      {positions.map((position, index) => (
        <Square
          position={position}
          key={`index${Math.random()}`}
          value={squares[index]}
          onClick={() => handleClick(index)}
        />
      ))}
      <Html
        position={[-1, -3, 0]}
        style={{
          color: 'rebeccapurple',
          fontFamily: 'sans-serif',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2em'
        }}>
        {winner ? (
          <>
            <div>
              {winner} Wins! <span style={{ fontSize: '2em' }}>👏</span> Well done!
            </div>
            <div>
              <ResetButton />
            </div>
          </>
        ) : (
          <>
            <div>{status}</div>
            <ResetButton />
          </>
        )}
      </Html>
    </>
  )
}

function calculateWinner(squares) {
  // possible wins
  const winningScenarios = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < winningScenarios.length; i++) {
    const [a, b, c] = winningScenarios[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function calculateTurns(squares) {
  // check for remaining turns by filtering out only null items
  const nullSquares = squares.filter((square) => !square)
  const remainingTurns = nullSquares.length
  return remainingTurns
}

function calculateStatus(winner, remainingTurns, player) {
  // if no winner and no turns it's a draw
  if (!winner && !remainingTurns) return "It's a draw"
  // if there's a winner return the winner
  if (winner) return `GG`
  // otherwise return next player
  return `Player ${player}, you're up!`
}

const ResetButton = () => {
  const restart = useGameStore((state) => state.restart)
  return (
    <button
      style={{
        color: 'orange',
        backgroundColor: 'black',
        border: '1px solid rebeccapurple',
        borderRadius: '5px',
        marginTop: '20px',
        padding: '10px'
      }}
      onClick={restart}>
      Reset
    </button>
  )
}
