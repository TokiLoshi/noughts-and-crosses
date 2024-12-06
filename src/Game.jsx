import { OrbitControls } from '@react-three/drei'
import Square from './Components/Square'
import Board from './Components/Board'
import { useControls } from 'leva'

export default function Game() {
  const lights = useControls(
    'newFolder',
    {
      lightPositionX: { value: 6, min: -20, max: 20, step: 0.1 },
      lightPositionY: { value: 7, min: -20, max: 20, step: 0.1 },
      lightPositionZ: { value: 7, min: -20, max: 20, step: 0.1 }
    },
    { collapsed: true }
  )

  const value = 'x'
  const rows = 3
  return (
    <>
      <directionalLight position={[lights.lightPositionX, lights.lightPositionY, lights.lightPositionZ]} />
      <Board rows={rows} />
    </>
  )
}
