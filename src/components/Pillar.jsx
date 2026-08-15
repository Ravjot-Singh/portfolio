export function Pillar({ position }) {
  return (
    <group position={position}>

      {/* Main pillar */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 8, 0.8]} />
        <meshStandardMaterial color="#353535" />
      </mesh>

      {/* Bottom decoration */}
      <mesh position={[0, -3.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.25, 1.2]} />
        <meshStandardMaterial color="#454545" />
      </mesh>

      <mesh position={[0, -3.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#3d3d3d" />
      </mesh>

      {/* Top decoration */}
      <mesh position={[0, 3.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.25, 1.2]} />
        <meshStandardMaterial color="#454545" />
      </mesh>

    </group>
  );
}