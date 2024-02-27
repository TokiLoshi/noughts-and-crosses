import Lights from './Lights'
import { OrbitControls } from '@react-three/drei'

export default function Experience() {
  console.log('experience loading')
  return (
    <>
      <color args={['#ff22ff']} attach="background" />
      <Lights />
      <OrbitControls />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  )
}
