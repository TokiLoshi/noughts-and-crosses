import { Html } from '@react-three/drei'
import { useControls } from 'leva'
import { DoubleSide } from 'three'

export default function Square({ position, value, onClick }) {
  const xPosition = position[0].toFixed(1)
  const yPosition = position[1].toFixed(1)
  const zPosition = position[2].toFixed(1)
  const rotationValues = useControls(
    'square',
    {
      rotationX: { value: 0, min: -90, max: 90, step: 0.1 },
      rotationY: { value: 0, min: -90, max: 90, step: 0.1 },
      rotationZ: { value: 0, min: -90, max: 90 }
    },
    { collapsed: true }
  )
  return (
    <>
      <mesh
        position={position}
        // rotation={[values.rotationX, values.rotationY, values.rotationZ]}
        onClick={onClick}>
        <boxGeometry />
        <meshStandardMaterial color="rebeccapurple" side={DoubleSide} />
      </mesh>
      {value && (
        <Html position={[xPosition, yPosition, zPosition]} style={{ color: 'whitesmoke' }}>
          {value}
        </Html>
      )}
    </>
  )
}
