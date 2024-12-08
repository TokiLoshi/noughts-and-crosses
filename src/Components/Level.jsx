import React from 'react'
import { DoubleSide } from 'three'
import * as THREE from 'three'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useRef } from 'react'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const gridMaterial = new THREE.MeshStandardMaterial({ color: '#4477CE' })

export default function Level({ length = 1 }) {
  const floor = useRef()
  const grid = useRef()
  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" ref={floor} position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <CuboidCollider args={[12, 0.1, 12]} />
        <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 12, 12]} />
          <meshStandardMaterial color="#005B41" side={DoubleSide} />
        </mesh>
      </RigidBody>
      {/* long vertical on the right */}
      <mesh
        position={[2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={gridMaterial}
        scale={[0.3, 1.5, 8 * length]}
        castShadow
        receiveShadow
      />
      {/* long vertical on the left */}
      <mesh
        position={[-2.15, 0.75, -length * 2 + 2]}
        geometry={boxGeometry}
        material={gridMaterial}
        scale={[0.3, 1.5, 8 * length]}
        castShadow
        receiveShadow
      />
      {/* long horizontal on the top */}
      <mesh
        position={[0, 0.75, -(length * 4) + 2]}
        geometry={boxGeometry}
        material={gridMaterial}
        scale={[9, 1.5, 0.3]}
        castShadow
        receiveShadow
      />

      {/* long horizontal on the bottom */}
      <mesh
        position={[0, 0.75, -length + 3]}
        castShadow
        receiveShadow
        geometry={boxGeometry}
        material={gridMaterial}
        scale={[9, 1.5, 0.3]}
      />
    </>
  )
}
