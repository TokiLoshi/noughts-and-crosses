import { useEffect } from 'react'
import useGameStore from '../Store'
import Square from './Square'
import { Html } from '@react-three/drei'

export default function Board({ rows = 3 }) {
  const [squares, setSquares] = useGameStore((state) => [state.squares, state.setSquares])
  const [xIsNext, setXIsNext] = useGameStore((state) => [state.xIsNext, state.setXIsNext])

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
  console.log('winner? ', winner)
  const turns = calculateTurns(squares)
  console.log('turns? ', turns)
  const player = xIsNext ? 'X' : '0'
  console.log('Current Player: ', xIsNext)
  const status = calculateStatus(winner, turns, player)
  console.log('current status: ', status)

  const onSquareClick = (index) => {
    console.log('clicked', index)
    // use the subscribed setSquares with the previous squares
    setSquares((prevSquares) => {
      const newSquares = [...prevSquares]
      if (newSquares[index] == null) {
        newSquares[index] = 'X'
      }
      return newSquares
    })
  }

  const handleClick = (index) => {
    if (squares[index] || winner) return
    const nextSquares = squares.slice()
    console.log('Next squares: ', nextSquares)

    console.log('No winner set next squares')
    nextSquares[index] = player
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
    console.log('Up next: ', xIsNext)
    const newWinner = calculateWinner(nextSquares)
    console.log('New winner: ', newWinner)
    const newTurns = calculateTurns(nextSquares)
    console.log('New turns length: ', newTurns)
    const status = calculateStatus(newWinner, newTurns, xIsNext)
    console.log('Status: ', status)
    // And then we want to calculate the status
    return status
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
            Winner is: <br />
            {winner}!<br />
            Well done!
          </>
        ) : (
          status
        )}
      </Html>
    </>
  )
}

function calculateWinner(squares) {
  // possible wins
  const winningScenarios = [
    // All next to each other
    // Vertical along columns
    // Diagonals
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  // Loop through winningScenarios
  for (let i = 0; i < winningScenarios.length; i++) {
    // destructure the lines into variablse
    const [a, b, c] = winningScenarios[i]
    // check to see if there's a match
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function calculateTurns(squares) {
  // check for remaining turns by filtering out only null items
  // return the count of them
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
