export function TopBeam() {

  return (

    <group>

      <mesh position={[0, 6.8, -2.5]} castShadow receiveShadow>
        <boxGeometry args={[12, 1, 1]} />
        <meshStandardMaterial
          color="#2b2b2d"
          roughness={0.8}
        />
      </mesh>

      <mesh position={[0, 6.2, -2.5]} castShadow receiveShadow>
        <boxGeometry args={[11.5, 0.3, 0.8]} />
        <meshStandardMaterial
          color="#4a4340"
          roughness={0.5}
          metalness={0.15}
        />
      </mesh>

    </group>

  );

}
