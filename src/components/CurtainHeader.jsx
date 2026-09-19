export function CurtainHeader() {
  return (
    <mesh position={[0, 6.2, 0.5]} castShadow receiveShadow>
      <boxGeometry args={[11, 0.7, 0.7]} />
      <meshStandardMaterial
        color="#5e1210"
        roughness={0.62}
        metalness={0.05}
      />
    </mesh>
  );
}
