import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Environment, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Game from './Game'
import { useControls, Leva } from 'leva'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

const root = ReactDOM.createRoot(document.getElementById('root'))

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
      {/* <Perf position={'top-left'} /> */}
      <OrbitControls />
      <ambientLight intensity={1.5} />
      <EffectComposer>
        <Bloom intensity={1.0} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
      </EffectComposer>
      <Game />
      {/* Experience was an experiment in with Physics
      Neither the experience nor Level components were fully developed */}
      {/* <Experience /> */}
    </Canvas>
    <Leva hidden={location.hash !== '#debug'} collapsed={true} />
  </>
)
