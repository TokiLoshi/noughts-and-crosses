import { OrbitControls } from '@react-three/drei'
import Square from './Components/Square'

const onSquareClick = () => {
  console.log('clicked')
}

export default function Game() {
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <directionalLight position={[10, 0, 0]} />
      <Square onSquareClick={onSquareClick} />
    </>
  )
}
