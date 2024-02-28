import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Environment } from '@react-three/drei'

const root = ReactDOM.createRoot(document.getElementById('root'))
const backgroundImage = './environemnt/kloppenheim_02_1k.hdr'
console.log('Background image: ', backgroundImage)

root.render(
  <Canvas
    shadows
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [4, 4, 6]
    }}>
    <Environment preset="city" />
    <Experience />
  </Canvas>
)
