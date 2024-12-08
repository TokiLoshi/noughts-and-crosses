import { useEffect, useRef, useState } from 'react'
import useGameStore from '../Store'
import Square from './Square'
import { Html } from '@react-three/drei'
import { calculateWinner, calculateTurns, calculateStatus } from '../utils.js'

export default function Board({ rows = 3 }) {
  const [squares, setSquares] = useGameStore((state) => [state.squares, state.setSquares])
  const [xIsNext, setXIsNext] = useGameStore((state) => [state.xIsNext, state.setXIsNext])
  const restart = useGameStore((state) => state.restart)
  const [glowingSquare, setGlowingSquare] = useState(null)

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

  const winnerInfo = calculateWinner(squares)
  const winner = winnerInfo?.winner
  const winningSquares = winnerInfo?.winningSquares || []

  const turns = calculateTurns(squares)
  const player = xIsNext ? 'X' : '0'
  const status = calculateStatus(winner, turns, player)

  const handleClick = (index) => {
    if (squares[index] || winner) return
    const nextSquares = squares.slice()
    nextSquares[index] = player
    setSquares(nextSquares)
    setXIsNext(!xIsNext)

    setGlowingSquare(index)

    setTimeout(() => setGlowingSquare(null), 1000)
  }

  return (
    <>
      {positions.map((position, index) => (
        <Square
          position={position}
          key={`index${Math.random()}`}
          value={squares[index]}
          onClick={() => handleClick(index)}
          currentPlayer={player}
          isGlowing={glowingSquare === index}
          glowColor={xIsNext ? 'orange' : 'rebeccapurple'}
          isWinner={winner && winningSquares.includes(index)}
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
