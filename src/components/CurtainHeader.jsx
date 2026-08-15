export function CurtainHeader() {
  return (
    <mesh position={[0, 6.2, 0.5]}>
      <boxGeometry args={[11, 0.7, 0.7]} />
      <meshStandardMaterial
        color="#681110"
        roughness={0.8}
      />
    </mesh>
  );
}