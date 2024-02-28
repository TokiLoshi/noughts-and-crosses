import React from 'react'
import { DoubleSide } from 'three'
import * as THREE from 'three'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const gridMaterial = new THREE.MeshStandardMaterial({ color: 'hotpink' })

export default function Level({ length = 1 }) {
  console.log('Level loading')
  return (
    <>
      <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12, 12]} />
        <meshStandardMaterial color="green" side={DoubleSide} />
      </mesh>
      {/* long vertical on the right */}
      <mesh
        position={[2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={gridMaterial}
        scale={[0.3, 1.5, 8 * length]}
      />
      {/* long vertical on the left */}
      <mesh
        position={[-2.15, 0.75, -length * 2 + 2]}
        geometry={boxGeometry}
        material={gridMaterial}
        scale={[0.3, 1.5, 8 * length]}
      />
      {/* long horizontal on the top */}
      <mesh
        position={[0, 0.75, -(length * 4) + 2]}
        geometry={boxGeometry}
        material={gridMaterial}
        scale={[9, 1.5, 0.3]}
      />

      {/* long horizontal on the bottom */}
      <mesh position={[0, 0.75, -length + 3]} geometry={boxGeometry} material={gridMaterial} scale={[9, 1.5, 0.3]} />
    </>
  )
}
