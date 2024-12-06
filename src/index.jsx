import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Environment, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Game from './Game'
import { useControls, Leva } from 'leva'

const root = ReactDOM.createRoot(document.getElementById('root'))
const backgroundImage = './environemnt/kloppenheim_02_1k.hdr'
console.log('Background image: ', backgroundImage)

root.render(
  <>
    <Canvas
      shadows
      camera={{
        fov: 75,
        near: 0.1,
        far: 100,
        position: [0, 0, 8]
      }}>
      <Perf position={'top-left'} />
      <OrbitControls />
      <ambientLight intensity={1.5} />

      <Game />
      {/* <Experience /> */}
    </Canvas>
    <Leva collapsed={true} />
  </>
)
