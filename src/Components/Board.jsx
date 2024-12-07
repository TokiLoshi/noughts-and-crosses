import { useEffect } from 'react'
import useGameStore from '../Store'
import Square from './Square'

export default function Board({ rows = 3 }) {
  const [squares, setSquares] = useGameStore((state) => [state.squares, state.setSquares])
  const [xIsNext, setXIsNext] = useGameStore((state) => [state.xIsNext, state.setXIsNext])

  console.log('Use effect is running and now we set up positions')
  const positions = []
  let x = -1
  let y = 1
  let z = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      positions.push([x, y, z])
      x += 1.1
    }
    console.log('New positions: ', positions)
    y -= 1.1
    x = -1
  }

  const player = xIsNext ? 'X' : '0'
  console.log('Current Player: ', xIsNext)

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
    if (squares[index]) return
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
    </>
  )
}

// import useGameStore from '../Store'
// import Square from './Square'

// export default function Board({ rows = 3 }) {
//   // Subscribe to `squares` and `setSquares` using Zustand
//   const [squares, setSquares] = useGameStore((state) => [state.squares, state.setSquares])

//   const positions = []
//   let x = -1
//   let y = 1
//   let z = 0

//   // Generate positions for the squares
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < rows; j++) {
//       positions.push([x, y, z])
//       x += 1.2
//     }
//     y -= 1.2
//     x = -1
//   }

//   const onSquareClick = (index) => {
//     console.log('clicked', index)
//     setSquares((prevSquares) => {
//       const newSquares = [...prevSquares]
//       if (newSquares[index] === null) {
//         newSquares[index] = 'X' // Hardcoded for now
//       }
//       return newSquares
//     })
//   }

//   return (
//     <>
//       {positions.map((position, index) => (
//         <Square
//           position={position}
//           key={`square-${index}`}
//           value={squares[index]}
//           onClick={() => onSquareClick(index)} // Pass the click handler
//         />
//       ))}
//     </>
//   )
// }
