import { Html } from '@react-three/drei'
import { useControls } from 'leva'
import { DoubleSide } from 'three'

export default function Square({ value, onSquareClick }) {
  const values = useControls('square', {
    rotationX: { value: 0, min: -90, max: 90, step: 0.1 },
    rotationY: { value: 0, min: -90, max: 90, step: 0.1 },
    rotationZ: { value: 0, min: -90, max: 90 }
  })
  return (
    <>
      <mesh
        position={[0, 1, 0]}
        rotation={[values.rotationX, values.rotationY, values.rotationZ]}
        onClick={onSquareClick}>
        <planeGeometry />
        <meshStandardMaterial color="rebeccapurple" side={DoubleSide} />
      </mesh>
      <Html position={[0, 2, 0]}>{value}</Html>
    </>
  )
}