const PILASTERS = [-3.2, 0, 3.2];

export function BackWall() {
  return (
    <group>
      <mesh position={[0, 3, -3]} receiveShadow>
        <boxGeometry args={[10.5, 7.5, 0.4]} />
        <meshStandardMaterial
          color="#1c1d21"
          roughness={0.92}
        />
      </mesh>

      {PILASTERS.map((x) => (
        <mesh
          key={x}
          position={[x, 3, -2.78]}
          receiveShadow
        >
          <boxGeometry args={[0.45, 7.5, 0.22]} />
          <meshStandardMaterial
            color="#232326"
            roughness={0.88}
          />
        </mesh>
      ))}
    </group>
  );
}
