import useGameStore from '../Store'
import Square from './Square'

const onSquareClick = () => {
  console.log('clicked')
}

export default function Board({ rows = 3 }) {
  const squares = useGameStore((state) => state.squares)

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
  console.log('positions: ', positions)
  return (
    <>
      {positions.map((position, index) => (
        <Square position={position} key={`index${Math.random()}`} value={squares[index]} onClick={onSquareClick} />
      ))}
    </>
  )
}
