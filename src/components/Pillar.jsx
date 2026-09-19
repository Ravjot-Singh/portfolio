export function Pillar({ position }) {
  return (
    <group position={position}>

      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.40, 0.45, 8, 24, 1]} />
        <meshStandardMaterial
          color="#2e2e30"
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>

      <mesh position={[0, -3.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.60, 0.60, 0.25, 24]} />
        <meshStandardMaterial
          color="#3c3b39"
          roughness={0.6}
          metalness={0.12}
        />
      </mesh>

      <mesh position={[0, -3.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.50, 0.50, 0.20, 24]} />
        <meshStandardMaterial
          color="#353433"
          roughness={0.65}
        />
      </mesh>

      <mesh position={[0, 3.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.60, 0.60, 0.25, 24]} />
        <meshStandardMaterial
          color="#3c3b39"
          roughness={0.6}
          metalness={0.12}
        />
      </mesh>

    </group>
  );
}
