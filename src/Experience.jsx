import Lights from './Lights'
import {
  DragControls,
  Float,
  OrbitControls,
  Html,
  Sky,
  Environment,
  Text3D,
  useMatcapTexture,
  Center
} from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import Level from './Level.jsx'
import { Physics, RigidBody, CuboidCollider, useRapier } from '@react-three/rapier'

// Step 2:
// Create the pieces
// Add up to 5 x's and 5 o'x

// Step 3:
// Gamee mechanics with the store

// Step 4:
// Create the UI
// Add the ability to drag and drop the pieces
// Add listen events that update the store with the board
// Disable the pieces

// Step 6:
// Add the animation for a win condition

// Step 7:
// Display the winner and add a reset button

// Step 8:
// Add sounds effects and effects with physics

function DragablePieces({ position }) {
  const meshRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const { viewport } = useThree()
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#4477CE'} />
    </mesh>
  )
}

// Computer's turn to pick
function AIpicks(squares) {
  const emptyArray = []
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      emptyArray.push(i)
    }
  }
  console.log('Empty array: ', emptyArray)
  const randomIndex = Math.floor(Math.random() * emptyArray.length)
  console.log('Random index: ', randomIndex)
  return emptyArray[randomIndex]
}

// Square component
function Square({ value, onSquareClick }) {
  return (
    <button className="cell" onClick={onSquareClick}>
      {value}
    </button>
  )
}

// Calculate the winner
function calculateWinner(squares) {
  console.log('Try cacluate the winner: ', squares)
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    console.log('Checking: ', a, b, c, squares[a], squares[b], squares[c])
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log('Winner: ', squares[a])
      return squares[a]
    }
  }
  return null
}

export default function Experience() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isNext, setNext] = useState(true)
  const [draggablePiece, setDraggablePiece] = useState([])
  const X = useRef()

  useEffect(() => {
    if (!isNext) {
      console.log('AI picks')
      const nextSquares = squares.slice()
      const computerPick = AIpicks(squares)
      console.log("Computer's pick: ", computerPick)
      nextSquares[computerPick] = 'O'
      setSquares(nextSquares)
      setNext(!isNext)
    }
  }, [isNext])

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    if (isNext) {
      nextSquares[i] = 'X'

      setSquares(nextSquares)
      setNext(!isNext)
      console.log(squares)
    }
  }
  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (isNext ? 'X' : 'O')
  }
  console.log('Winner: ', winner)
  const backgroundImage = './environment/kloppenheim_02_4k.hdr'

  return (
    <>
      <Physics debug>
        <Html>
          <div style={{ color: 'black' }}>{status}</div>
          <div style={{ color: 'white' }}>Tic Tac Toe</div>
          <div className="board">
            <div className="row" style={{ display: 'flex' }}>
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="row">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="row">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
          </div>
        </Html>
        <color args={['#070F2B']} attach="background"></color>
        <Lights />
        {/* <OrbitControls /> */}
        <Level />
        <Center position={[0, 2, -6]}>
          <Float speed={0.3}>
            <Text3D height={0.2} size={0.75} font="./fonts/helvetiker_regular.typeface.json">
              Noughts & Crosses
              <meshStandardMaterial color={'#4477CE'} />
            </Text3D>
          </Float>
        </Center>
        <DragControls>
          <CuboidCollider args={[1, 1, 1]} />
          <Text3D
            rotation={[0, 1, 0]}
            position={[-1, 0, 1]}
            height={0.2}
            size={0.75}
            font="./fonts/helvetiker_regular.typeface.json">
            X
          </Text3D>
        </DragControls>

        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'#4477CE'} />
        </mesh>
      </Physics>
    </>
  )
}
